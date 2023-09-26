# TEMPORAL WORKFLOW HELPER

## Description

The **Temporal Workflow Helper** is a utility designed to facilitate the submission of data to Temporal using the new Temporal Command-Line Interface (Temporal CLI). It streamlines the process of sending data to Temporal, making it easier to interact with Temporal workflows and activities.

## Prerequisites
Before using this tool, make sure you have the following environment variables set up:

- `PORT`: The port number to communicate with Temporal. (e.g., `3778`)
- `TEMPORAL_SERVER`: The temporal server you already started. Should be your `localhost` or your docker host. (e.g., `localhost:7233`, `temporal:7233`).
- `TEMPORAL_UI_CLIENT`: Temporal UI client URL.
- `TEMPORAL_MAIN_PROCESS`: Specify the main process or entry point for your Temporal workflows. Should be `temporal` for localhost or `/root/.temporalio/bin/temporal`, if you're using Docker.
- `TEMPORAL_EXTERNAL_NETWORK`: Docker only. Especify your temporal network.
- `NAMESPACE`: Main namespace of your workflows.

## Docker
Use `docker-compose` + `Makefile` to facilitate your experience. Run the command bellow to build and initiate your Helper:

```bash
make build
```

## Installation

To install the **Temporal Workflow Helper**, follow these steps:

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/gustavocarneiroa/temporal_tctl.git
    ```

2. Navigate to the project directory:

    ```bash
    cd temporal_tctl
    ```

3. Install the necessary dependencies:

    ```bash
    npm install
    ```

4. Install Temporal CLI:
    - Bash:
    ```bash
    curl -sSf https://temporal.download/cli.sh | sh
    echo export PATH="\$PATH:/root/.temporalio/bin" >> ~/.bashrc
    ```
    - ZSH:
     ```bash
    curl -sSf https://temporal.download/cli.sh | sh
    echo export PATH="\$PATH:/root/.temporalio/bin" >> ~/.zshrc
    ```
## Usage

Once you have installed the **Temporal Workflow Helper**, you can use it as follows:

1. Set the required environment variables (`PORT`, `TEMPORAL_SERVER`, `TEMPORAL_UI_CLIENT`, `TEMPORAL_MAIN_PROCESS`, `TEMPORAL_EXTERNAL_NETWORK`, `NAMESPACE`) in your environment or in a `.env` file. You can copy the main strucuture using `cp .env.example .env`

2. Run the TCTL Temporal Helper :
    - Localhost:
    ```bash
    node .
    ```
    - Docker: 
    ```bash
    #if builded
    make up
    #else
    make build
    ```
3. Access your localhost with your setted `PORT` (e.g, https://localhost:3333)

4. Submit data from the helper UI.

## Contributing

We welcome contributions to the TCTL Temporal Helper project. Feel free to fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

Special thanks to the Temporal community for their support and contributions to this project.