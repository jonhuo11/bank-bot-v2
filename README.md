## Bank Bot v2
Created by jonhuo11  
Discord ID is 613134824206630928  
Development status is **WIP**

## Description
Discord bot for storing files attached in messages for later retrieval. Users have their own bank accounts that they can store any number of files into, and they can then retrieve these files at will. The purpose of this functionality is to remove the need to search through chat logs to find an unpinned file that was posted long ago. This removes the need for users to store files on their local disk and can essentially use Discord attachments as their own personal storage bin. Example use cases include archiving funny memes and videos, or saving an important PDF for later use.

## Invite Link
Feel free to use [this link](https://discord.com/oauth2/authorize?client_id=NzQyMTUyNzM0Njg5NzIyNTU0.XzB9mA.MarVY4BdH8jjQiajMrc0DBRV7KM&scope=bot&permissions=37219392 "this link") to invite Bank Bot v2 to your own Discord server.

## For Developers
The source code for Bank Bot v2 is public and available on this Github page. The backend for this bot is handled using Firebase, so if you want to host this bot yourself you need to set up a realtime database on Firebase and create a config.json in this directory to setup the admin login tokens for both the Discord and Firebase APIs. See example-config.json for the template to use when creating your own config.json.
