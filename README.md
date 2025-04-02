# Swiggy Clone

This project is a clone of the Swiggy food delivery application, featuring both client-side and server-side components.

## Table of Contents

- [Project Structure](#project-structure)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [AI Feedback Enhancement](#ai-feedback-enhancement)
- [Contributing](#contributing)
- [License](#license)

## Project Structure

The repository is organized as follows:

- `client/`: Contains the React.js frontend code.
- `server/`: Contains the backend code.
- `aifeedback.py`: Python script for AI feedback enhancement.
- `.gitignore`: Specifies files and directories to be ignored by Git.
- `requirements.txt`: Lists Python dependencies for the AI feedback script.

## Features

- **Interactive Dashboard**: View pending feedback requests from peers, managers, and stakeholders.
- **Voice & Text Feedback**: Record feedback via speech or text input.
- **AI-Powered Summaries**: Utilize AI to generate structured summaries highlighting key strengths and development areas.
- **Feedback Management**: Store, retrieve, and manage feedback records with search and filter functionalities.

## Prerequisites

Ensure you have the following installed:

- **Node.js**: For running the client and server applications.
- **Python 3.x**: For running the AI feedback enhancement script.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Vishnuvamsith/Swiggy.git
   ```

2. **Navigate to the Project Directory**:
   ```bash
   cd Swiggy
   ```

3. **Install Client Dependencies**:
   ```bash
   cd client
   npm install
   ```

4. **Install Server Dependencies**:
   ```bash
   cd ../server
   npm install
   ```

5. **Install Python Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

1. **Start the Server**:
   ```bash
   cd server
   npm run dev
   ```

2. **Start the Client**:
   ```bash
   cd ../client
   npm start
   ```

3. **Run the AI Feedback Enhancement Script**:
   ```bash
   python aifeedback.py
   ```

4. **Access the Application**:
   Open your web browser and navigate to `http://localhost:3000` to interact with the application.

## AI Feedback Enhancement

The `aifeedback.py` script utilizes AI models to enhance raw feedback provided by users. It processes the feedback to generate structured summaries, highlighting key strengths and areas for development. Ensure that the necessary Python dependencies are installed as per the `requirements.txt` file.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the [MIT License](LICENSE).

