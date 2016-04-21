# eden-asgn-batchdl-nodejs

* Eden Assignment Batch Downloader in Node.js
* Downloading All Unfinished Assignments on [eden.sysu.edu.cn](http://eden.sysu.edu.cn/)
* Generate Dev-C++ Compatible Project Files Automatically
* License: GPL v3

=======

## Usage

Windows: ``npm install && npm start``, or simply use ``run.bat``.

Linux / Mac OS: ``npm install && npm start``.

Note:

``npm install`` is only for installing dependencies so you can just use ``npm start`` for the next time.

Then you only need to enter your username and password. 

=======
There are some precompiled binaries (using ``enclose``) for you (if you don't have node.js):

[``windows-32bit``](https://github.com/iebb/eden-asgn-batchdl-nodejs/releases/download/v0.16.4.21/downloader-win32.exe)
``19.7 MiB``

[``windows-64bit``](https://github.com/iebb/eden-asgn-batchdl-nodejs/releases/download/v0.16.4.21/downloader-win64.exe)
``24.9 MiB``

[``ubuntu1404-64bit``](https://github.com/iebb/eden-asgn-batchdl-nodejs/releases/download/v0.16.4.21/downloader-ubuntu64)
``31.9 MiB``

=======

Need [node.js](https://nodejs.org/en/ "Node.js") to run. [[download 5.10.1]](https://nodejs.org/dist/v5.10.1/node-v5.10.1-x64.msi)

Install Dependencies:

	npm install

To Run:

	npm start

For Windows users there's a ``run.bat`` does ``npm install && npm start``.

To Compile using ``enclose``:

	npm install -g enclose
	enclose downloader.js
