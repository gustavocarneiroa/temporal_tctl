# TEMPORAL WORKFLOW HELPER

## Description

The **Temporal Workflow Helper** is a utility designed to facilitate the submission of data to Temporal using the new Temporal Command-Line Interface (Temporal CLI). It streamlines the process of sending data to Temporal, making it easier to interact with Temporal workflows and activities.

## Prerequisites
Before using this tool, make sure you have the following environment variables set up:

- `PORT`: The port number to communicate with Temporal. (e.g., `3778`)
- `TEMPORAL_MAIN_PROCESS`: Specify the main process or entry point for your Temporal workflows. Should be `temporal` for localhost or `/root/.temporalio/bin/temporal`, if you're using Docker.
- `TEMPORAL_EXTERNAL_NETWORK`: Docker only. Especify your temporal network.
- `CONFIG_TEMPORAL_PATH`: Path to `.config.temporal`. It's optional, only needed when the config file is not in the root folder.

And set your `.config.temporal` file to set your environments with the right parameters.
```javascript
[
    {
        "environment": "prod", // Your environment slug
        "namespace": "test_namespace", // Context namespace to this environment
        "address": "temporal:7233", // Address to your Temporal Server
        "ui": "http://localhost:8080" // Address to you Temporal UI
    }
]
```

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

1. Set the required environment variables (`PORT`,  `TEMPORAL_MAIN_PROCESS`, `TEMPORAL_EXTERNAL_NETWORK` and/or `CONFIG_TEMPORAL_PATH`) in your environment or in a `.env` file. You can copy the main strucuture using `cp .env.example .env`.

2. Set an object with a configuration array of each of yours Temporal Servers connections in a `.config.temporal` file. You can copy the main structure using `cp .config.example.temporal .config.temporal`

3. Run the TCTL Temporal Helper :
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
4. Access your localhost with your setted `PORT` (e.g, https://localhost:3333)

5. Submit data from the helper UI.

## Contributing

We welcome contributions to the TCTL Temporal Helper project. Feel free to fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

Special thanks to the Temporal community for their support and contributions to this project.