# TCTL TEMPORAL HELPER

## Description

The **TCTL Temporal Helper** is a utility designed to facilitate the submission of data to Temporal using the Temporal Command-Line Interface (TCTL). It streamlines the process of sending data to Temporal, making it easier to interact with Temporal workflows and activities.

## Prerequisites

Before using this tool, make sure you have the following environment variables set up:

- `PORT`: The port number to communicate with Temporal. (e.g., `3778`)

- `TEMPORAL_CLIENT`: Temporal client configuration, including connection details.

- `MAIN_PROCESS`: Specify the main process or entry point for your Temporal workflows.

- `INITIAL_ARGUMENTS`: Initial arguments to be passed when invoking Temporal, typically used for executing Temporal admin tools.

## Docker

If you are running Temporal in a Docker container, ensure that you have the necessary Docker configurations set up correctly.

## Installation

To install the **TCTL Temporal Helper**, follow these steps:

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/gustavocarneiroa/temporal_tctl.git
    ```

2. Navigate to the project directory:

    ```bash
    cd your_repository
    ```

3. Install the necessary dependencies:

    ```bash
    npm install
    ```

## Usage

Once you have installed the **TCTL Temporal Helper**, you can use it as follows:

1. Set the required environment variables (`PORT`, `TEMPORAL_CLIENT`, `MAIN_PROCESS`, `INITIAL_ARGUMENTS`) in your environment or in a configuration file.

2. Run the TCTL Temporal Helper with the desired arguments to interact with Temporal:

    ```bash
    node tctl-temporal-helper.js [options]
    ```

    - `[options]`: Specify the options and commands you want to execute with TCTL Temporal Helper.

## Example

Here's an example of how to use the TCTL Temporal Helper to interact with Temporal:

```bash
# Set the environment variables
export PORT=3778
export TEMPORAL_CLIENT=my_temporal_config
export MAIN_PROCESS=my_workflow
export INITIAL_ARGUMENTS=exec,temporal-admin-tools

# Run TCTL Temporal Helper
node tctl-temporal-helper.js --command submit --workflow my_workflow
```

In this example, we first set the required environment variables and then use TCTL Temporal Helper to submit a workflow named `my_workflow`.

## Contributing

We welcome contributions to the TCTL Temporal Helper project. Feel free to fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

Special thanks to the Temporal community for their support and contributions to this project.