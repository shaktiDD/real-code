const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

const TEMP_DIR = path.join(__dirname, 'temp');
if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR);
}

const execute = async (req, res) => {
    const { code, input } = req.body;

    if (!code || typeof code !== 'string') {
        return res.status(400).json({ error: 'Code is required and must be a string' });
    }

    // Create a unique filename for the temporary code file
    const codeFileName = `tempCode_${Date.now()}.js`;
    const codeFilePath = path.join(TEMP_DIR, codeFileName);

    // Write the code to the temporary file
    fs.writeFileSync(codeFilePath, code);

    console.log("Hello");

    // debug ke liye log kar rakha hai
    console.log(`Executing command: node ${codeFilePath}`);

    // Execute the code file
    exec(`node ${codeFilePath}`, { input: input || '' }, (err, stdout, stderr) => {
        // Clean up the temporary file
        // fs.unlinkSync(codeFilePath);

        if (err) {
            console.log('Execution error:', err); // Log the error object
            console.log('Standard error:', stderr); // Log standard error output
            // console.log(err);
            // console.log(stderr);
            return res.status(500).json({ error:err.message });
        }
        //command likha hai to delele the file path which is temporarily made
        fs.unlinkSync(codeFilePath);

        res.json({ output: stdout });
    });
};

module.exports = execute;
