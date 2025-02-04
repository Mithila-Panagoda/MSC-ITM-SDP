# Contributing to ITM MSC SDP Assignment

We welcome contributions to the ITM MSC SDP Assignment project. This document outlines the process for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Reporting Issues](#reporting-issues)
- [Submitting Pull Requests](#submitting-pull-requests)
- [Development Guidelines](#development-guidelines)
- [Style Guide](#style-guide)
- [Conventional Commits](#conventional-commits)
- [License](#license)

## Code of Conduct

By participating in this project, you agree to abide by the [Code of Conduct](CODE_OF_CONDUCT.md). Please read it to understand the expectations for contributing to this project.

## How to Contribute

### Reporting Issues

If you encounter any bugs, issues, or have feature requests, please report them using the [GitHub Issues](https://github.com/Mithila-Panagoda/MSC-ITM-SDP/issues) page. Provide as much detail as possible to help us understand and address the issue.

### Submitting Pull Requests

To contribute code to the project, follow these steps:

1. **Fork the repository:**

    Click the "Fork" button at the top right corner of the repository page to create a copy of the repository in your GitHub account.

2. **Clone the forked repository:**

    ```bash
    git clone https://github.com/your-username/your-repository.git
    cd your-repository
    ```

3. **Create a new branch:**

    ```bash
    git checkout -b feature/your-feature-name
    ```

4. **Make your changes:**

    Implement your changes in the new branch. Ensure that your code follows the project's [Style Guide](#style-guide).

5. **Commit your changes:**

    ```bash
    git add .
    git commit -m "Add your commit message here"
    ```

6. **Push your changes to your forked repository:**

    ```bash
    git push origin feature/your-feature-name
    ```

7. **Create a pull request:**

    Go to the original repository and click the "New Pull Request" button. Select your branch and provide a detailed description of your changes.

### Development Guidelines

- Ensure that your code is well-documented and follows the project's [Style Guide](#style-guide).
- Write tests for your code and ensure that all tests pass before submitting a pull request.
- Keep your commits small and focused. Each commit should represent a single logical change.
- Rebase your branch before submitting a pull request to ensure that it is up-to-date with the latest changes in the main branch.

### Style Guide

- Follow the [PEP 8](https://www.python.org/dev/peps/pep-0008/) style guide for Python code.
- Use meaningful variable and function names.
- Write clear and concise comments to explain the purpose of your code.
- Ensure that your code is properly formatted and linted.

## Conventional Commits

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages to improve collaboration, code readability, and automated changelog generation. Here’s a quick summary:

- **Format**: `<type>(<scope>): <description>`
- **Types**:
  - `feat`: New feature
  - `fix`: Bugfix
  - `docs`: Documentation updates
  - `style`: Code style changes (e.g., formatting, no logic changes)
  - `refactor`: Code changes that neither fix a bug nor add a feature
  - `test`: Adding or modifying tests
  - `chore`: Maintenance or meta tasks
- **Scope**: (Optional) Context of the change (e.g., `auth`, `ui`, `api`)

For detailed information and examples, check out:  
- [Conventional Commits Official Documentation](https://www.conventionalcommits.org/)  
- [Conventional Commits Cheat Sheet](https://cheatsheets.zip/conventional-commits)

## License

By contributing to this project, you agree that your contributions will be licensed under the [MIT License](LICENSE).
