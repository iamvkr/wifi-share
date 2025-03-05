import { spawn } from 'child_process';

export const openInEdge = (localIp,PORT) => {
    const child =
        spawn(
            'start', [
            '"" "%ProgramFiles(x86)%\\Microsoft\\Edge\\Application\\msedge.exe"',
            `--app="http://${localIp}:${PORT}"`,
        ],
            { shell: true }
        );
    child.stdout.on('data',
        (data) => {
            // console.log(`stdout: ${data}`);
        });

    child.stderr.on('data',
        (data) => {
            console.error(`Edge Browser Not found or Not properly Configured!!`);
        });

    child.on('close',
        (code) => {
            console.log(
                // `child process exited with code ${code}`
            );
        });
}