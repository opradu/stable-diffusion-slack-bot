const { spawn } = require('child_process');


module.exports = class tdInvokeCli {

    constructor() {
        this._invokeAiBatPath = '';

        this.process = false;
        this.isReady = false;


        this.isRunning = false;
        this.currentTaskId = '';
        this.currentTaskPayload = {};
        this.promptsQueue = [];


        // show full console output
        this.showConsoleDebug = true;

        // fix double onProgress callbacks
        this.lastProgressValue = null;
    }

    setInvokeAiBatPath (newPath) {
        this._invokeAiBatPath = newPath;
    }


    onImageReady(taskId, imgPath) {
        // replace this with the callback
    }
    onError(taskId, message) {

    }


    onProgress(taskId, newProgress) {
        // replace this with the callback
    }

    text2img(taskId, prompt, payload) {
        this.promptsQueue.push({
            taskId: taskId,
            prompt: prompt,
            payload: payload
        });

        if (this.isRunning === true) {
            console.log("text2img> _runNextInPromptQueue is already running, the task " + taskId + " and prompt " + prompt + " is in queue");
            return;
        }

        if (this.isReady === false) {
            console.log("text2img> _runNextInPromptQueue is not ready, the task " + taskId + " and prompt " + prompt + " is in queue");
            return;
        }

        this._runNextInPromptQueue();

    }

    _runNextInPromptQueue() {

        if (this.promptsQueue.length === 0) {
            console.log("_runNextInPromptQueue > no more prompts");
            this.isRunning = false;
            return;
        }

        this.isRunning = true;
        this.lastProgressValue = null;


        // Remove and return the first element from the queue
        const firstPromptsQueue = this.promptsQueue.shift();
        this.currentTaskId = firstPromptsQueue.taskId;
        this.currentTaskPayload = firstPromptsQueue.payload;
        this.process.stdin.write(firstPromptsQueue.prompt  + '\n');
        console.log("_runNextInPromptQueue > task: " + this.currentTaskId + " w prompt: " + firstPromptsQueue.prompt + " is running");

    }




    start() {
        this.process = spawn(this._invokeAiBatPath, [], { shell: true });


        this.process.stdout.on('data', (data) => {

            if (this.showConsoleDebug === true) {
                console.log(`stdout: ${data}`);
            }

            let dataString = data.toString();

            // select 1 on startup
            if (dataString.includes("Please enter 1-10, Q:")) {
                this.process.stdin.write("1"  + '\n');
                return;
            }


            // parse the file
            if (dataString.includes("Outputs")) {
                //const regex = /(\[[\d]+\]\s)([A-Za-z]:[\/\\](?:[A-Za-z0-9-_+]+[\/\\])+[\w]+\.[\w]+)/;
                const regex = /(\[[\d]+\]\s)([A-Za-z]:[\/\\](?:[A-Za-z0-9-_+]+[\/\\])+[\w]+(\.[\w]+))/;
                const fileMatch = dataString.match(regex);

                if (fileMatch) {
                    const filePath = fileMatch[2];
                    this.onImageReady(this.currentTaskId, filePath + ".png", this.currentTaskPayload);
                    //console.log('File path:', filePath + '.png');
                } else {
                    this.onError(this.currentTaskId, "File generated but not found on disk");
                }
            }



            if (dataString.includes("invoke>")) {
                this.isReady = true;
                this._runNextInPromptQueue();
            }


        });


        this.process.stderr.on('data', (data) => {
            if (this.showConsoleDebug === true) {
                console.error(`stderr: ${data}`);
            }

            let dataString = data.toString();
            const str = dataString;
            const regex = /(\d+)%/;
            const match = str.match(regex);

            if (match) {
                const percentage =  parseInt(match[1]);
                if (this.lastProgressValue !== percentage) {
                    this.onProgress(this.currentTaskId, percentage, this.currentTaskPayload);
                    this.lastProgressValue = percentage;
                }

            }

        });
        this.process.on('error', (error) => {
            if (this.showConsoleDebug === true) {
                console.error(`error: ${error.message}`);
            }
        });

        this.process.on('close', (code) => {
            if (this.showConsoleDebug === true) {
                console.log(`child process exited with code ${code}`);
            }
            this.onError(this.currentTaskId, "process closed!");
        });

    }

}