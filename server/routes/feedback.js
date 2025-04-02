const express = require('express');
const User = require('../models/user');  // Assuming your User model is stored here
const Feedback = require('../models/feedback');
const authMiddleware = require('../middlewares/authorization');
const router = express.Router();

// View All Employees (For Manager)
router.get('/manager/employees', authMiddleware, async (req, res) => {
    try {
        const employees = await User.find({ role: 'employee' }).select('name email');
        console.log(employees)
        res.json({ employees });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching employees', error: err.message });
    }
});

// Manager: View All Pending Feedbacks (Pending feedback requests for the manager)
router.get('/manager/feedbacks/pending', authMiddleware, async (req, res) => {
    try {
        const from =await User.findOne({name:req.user.name})
        const pendingFeedbacks = await Feedback.find({
            receiver: from,  // Receiver is the logged-in manager
            status: 'pending'
        }).populate('requester', 'name email')  // Populate requester details
          .populate('feedbackOn', 'name email');  // Populate feedbackOn details (who the feedback is about)

        if (pendingFeedbacks.length === 0) {
            return res.status(200).json({ message: 'No pending feedbacks found for this manager.' });
        }

        res.json({ pendingFeedbacks });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching pending feedbacks', error: err.message });
    }
});
// Manager: Submit Feedback for Employee's Requested Feedback
router.post('/manager/feedbacks/submit-requested', authMiddleware, async (req, res) => {
    try {
        const { feedbackId, feedbackText, aiSummary } = req.body;

        if (!feedbackId || !feedbackText) {
            return res.status(400).json({ message: "Feedback ID and text are required." });
        }

        // Find the existing feedback request
        const feedback = await Feedback.findById(feedbackId);

        if (!feedback) {
            return res.status(404).json({ message: "Feedback request not found." });
        }

        // Update the feedback with the submitted data
        feedback.feedbackText = feedbackText;
        feedback.aiSummary = aiSummary;
        feedback.status = 'completed';

        await feedback.save();
        return res.status(200).json({ message: "Feedback submitted successfully." });
    } catch (err) {
        res.status(500).json({ message: 'Error submitting feedback', error: err.message });
    }
});
// Manager: Get Total Count of Pending Feedbacks
router.get('/feedbacks/pending/count', authMiddleware, async (req, res) => {
    try {
        // Find the manager's user ID based on the email
        const manager = await User.findOne({ email: req.user.userId });

        if (!manager) {
            return res.status(404).json({ message: "Manager not found" });
        }

        // Count pending feedbacks where the receiver is the manager's ObjectId
        const pendingCount = await Feedback.countDocuments({
            receiver: manager._id,  // Use ObjectId instead of email
            status: 'pending'
        });

        res.json({ totalPendingFeedbacks: pendingCount });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching pending feedback count', error: err.message });
    }
});



// Manager: Send Feedback Request (To All or Selective Employees)
router.post('/manager/feedbacks/submit', authMiddleware, async (req, res) => {
    try {
        console.log(req.body)
        const { feedbackOn, sendToAll = false, selectedEmployees = [], feedbackText } = req.body;

        // Validate required fields
        if (!feedbackOn) {
            return res.status(400).json({ message: "Please specify the employee to give feedback on." });
        }
        if (!feedbackText) {
            return res.status(400).json({ message: "Feedback text is required." });
        }

        // Find the employee on whom feedback is requested
        const feedbackOnEmployee = await User.findById(feedbackOn);
        const from = await User.findOne({ email: req.user.userId });
        if (!feedbackOnEmployee || feedbackOnEmployee.role !== 'employee') {
            return res.status(404).json({ message: "Employee not found for feedback." });
        }

        // Handle selected employees case
        if (!sendToAll && selectedEmployees.length > 0) {
            // Verify all selected employees exist
            const existingEmployees = await User.find({
                _id: { $in: selectedEmployees },
                role: 'employee',
                _id: { $ne: feedbackOnEmployee._id }
            });

            if (existingEmployees.length !== selectedEmployees.length) {
                return res.status(400).json({ message: "Some selected employees are invalid." });
            }

            // Create feedback requests
            const feedbackPromises = existingEmployees.map(employee => {
                return new Feedback({
                    requester: from._id, // Use the ObjectId from authenticated user
                    receiver: employee._id,
                    feedbackOn: feedbackOnEmployee._id,
                    feedbackText: feedbackText,
                    status: 'pending'
                }).save();
            });

            await Promise.all(feedbackPromises);
            return res.status(201).json({ 
                message: `Feedback requests sent to ${existingEmployees.length} employees.`
            });
        }

        return res.status(400).json({ 
            message: "Invalid request. Please provide selectedEmployees or set sendToAll." 
        });
    } catch (err) {
        console.error('Error submitting feedback:', err);
        res.status(500).json({ 
            message: 'Error submitting feedback request', 
            error: err.message 
        });
    }
});


// Employee: View Peers & Manager
router.get('/employee/peers-manager', authMiddleware, async (req, res) => {
    try {
        console.log(req.user)
        // Find the logged-in employee
        const employee = await User.findOne({email:req.user.userId}); // Changed from userId to _id

        if (!employee || employee.role !== 'employee') {
            return res.status(403).json({ message: "Access denied. Only employees can view peers and managers." });
        }

        // Find all employees except the logged-in employee (peers)
        console.log("peers")
        const peers = await User.find({ 
            role: 'employee', 
            _id: { $ne: employee._id } 
        }).select('_id name email role');
        console.log(peers) // Added _id and role to selection

        // Find the manager (assuming there's only one manager)
        const manager = await User.findOne({ role: 'manager' }).select('_id name email role');

        // Combine peers and manager into a single array
        const employees = [...peers];
        if (manager) employees.push(manager);
        console.log(employees)

        res.json({ employees }); // Changed response format to match manager endpoint
    } catch (err) {
        res.status(500).json({ message: 'Error fetching peers and manager', error: err.message });
    }
});


// Employee: View Pending Feedbacks (For Employees to view their pending feedbacks)
router.get('/employee/feedbacks/pending', authMiddleware, async (req, res) => {
    try {
        const from=await User.findOne({name:req.user.name})
        const pendingFeedbacks = await Feedback.find({
            receiver: from,  // Receiver is the logged-in employee
            status: 'pending'
        }).populate('requester', 'name email')  // Populate requester details
          .populate('feedbackOn', 'name email');  // Populate feedbackOn details (who the feedback is about)

        if (pendingFeedbacks.length === 0) {
            return res.status(200).json({ message: 'No pending feedbacks found for this employee.' });
        }

        res.json({ pendingFeedbacks });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching pending feedbacks', error: err.message });
    }
});

// Employee: Submit Feedback (For Employees to submit feedback)
router.post('/employee/feedbacks/submit', authMiddleware, async (req, res) => {
    try {
        const { feedbackId, feedbackText, aiSummary } = req.body;

        if (!feedbackId || !feedbackText) {
            return res.status(400).json({ message: "Feedback ID and text are required." });
        }

        // Find the existing feedback request
        const feedback = await Feedback.findById(feedbackId);
        console.log(feedback)

        if (!feedback) {
            return res.status(404).json({ message: "Feedback request not found." });
        }
        feedback.feedbackText = feedbackText;
        feedback.aiSummary = aiSummary;
        feedback.status = 'completed';

        await feedback.save();
        console.log(feedback)
        return res.status(200).json({ message: "Feedback submitted successfully." });
    } catch (err) {
        res.status(500).json({ message: 'Error submitting feedback', error: err.message });
    }
});

// Employee: Request Feedback for Themselves
router.post('/employee/feedbacks/request', authMiddleware, async (req, res) => {
    try {
        console.log(req.body)
        const { selectedEmployees, feedbackText } = req.body;

        // Validate required fields
        if (!selectedEmployees?.length || !feedbackText) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Find the employee on whom feedback is requested
        const feedbackOnEmployee = await User.findOne({email:req.user.userId});
        if (!feedbackOnEmployee || feedbackOnEmployee.role !== 'employee') {
            return res.status(404).json({ message: "Employee not found for feedback." });
        }

        // Verify all selected employees exist
        // const validReceivers = await User.find({
        //     _id: { $in: selectedEmployees },
        //     $or: [{ role: 'employee' }, { role: 'manager' }], // Allow both peers and manager
        //     _id: { $ne: feedbackOnEmployee._id } // Exclude feedback subject
        // });

        // if (validReceivers.length !== selectedEmployees.length) {
        //     return res.status(400).json({ message: "Some selected employees are invalid." });
        // }

        // Create feedback requests
        const feedbackPromises = selectedEmployees.map(receiver => {
            return new Feedback({
                requester: feedbackOnEmployee._id, // Use ObjectId
                receiver: receiver,
                feedbackOn: feedbackOnEmployee._id,
                feedbackText,
                status: 'pending'
            }).save();
        });

        await Promise.all(feedbackPromises);
        return res.status(201).json({ 
            message: `Feedback requests sent to ${selectedEmployees.length} employees.`
        });
    } catch (err) {
        console.error('Error submitting feedback:', err);
        res.status(500).json({ 
            message: 'Error submitting feedback request', 
            error: err.message 
        });
    }
});

module.exports = router;
