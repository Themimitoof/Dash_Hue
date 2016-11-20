# Dash Hue: Control your Hue installation with your Amazon Dash button
This code permits you to use your Amazon Dash button to control a group of light on your Hue installation.

## Why using my Amazon Dash button rather a Dimmer Switch or Philips Tap?
Amazon Dash cost $4.99 or free if you order one time with them. But the Dimmer switch cost approximately $25 and the Philips Tap cost $49.99 (60€ in France). The only one inconvenient is the time to turn on/off the light, approximately 8-15 seconds...

# Requirements
 * Linux machine (I don't have tested with Windows)
 * Root rights
 * NodeJS
 * Amazon Dash button (Your dash button should not have a configured product)
 * Philips Hue installation

# Installation and configuration
First, you need to clone this repo:
```
git clone https://github.com/Themimitoof/Dash_Hue.git && cd Dash_Hue
```

And you need to install all dependencies for the code:
```
npm install
```

Now, execute this command to help you to find the MAC address of your Dash button(s). Tape on your Dash button(s) and copy the MAC Address(es). Tape _Ctrl+C_ to exit the program.
```
node index.js searchDash
```

Enter the MAC address(es) on the ```index.js``` file on the _dash_ variable:
```
// If you have only one Dash button
var dash        = dash_btn(["AA:BB:CC:DD:EE:FF"]);

// If you likely to use multiple Dash buttons for the same group
var dash        = dash_btn(["AA:BB:CC:DD:EE:FF", "CC:A1:D2:F6:30:90", ...]);
```

At the same time, change the value of _hue_host_ with the IP of your Hue bridge (if you don't know the IP of your bridge, scan your network with Angry IP Scanner or similar tool):
```
var hue_host    = "192.168.1.1";
```

Now, push the central button of your bridge and execute this command to create new user on your bridge:
```
node index.js newUser
```

And copy the result on the _hue_user_ variable on ```index.js``` file:
```
var hue_user    = "qsDJODSQkKAPOdqsdoaDJQSODJncxwbcw";
```

Execute this command to get the _group ID_ of the room you desirate control with your Dash button:
```
node index.js getGroups
```

Edit ```index.js``` file and modify the _hue_group_ variable with the ID of the room you want to control:
```
var hue_group   = 1;
```

Execute ```node index.js```, push on your dash button and check if your lights turn on/off. If all works good, tape this command to execute the server in background task:
```
screen -dmS Dash_Hue node index.js
```


# Commands
## Start the server
```
node index.js
```

In background with screen:
```
screen -dmS Dash_Hue node index.js
```

## Find dash buttons
```
node index.js searchDash
```

## Create new user in Hue bridge
```
node index.js newUser
```

## Find groups (rooms) in Hue bridge
```
node index.js getGroups
```

# troubleshoot
 * _"The dash button takes sooooooooooo much time to change the light state, why?"_ It's normal. On pressing the dash button, he enables the Wifi, request an IP to DHCP server and send the request. Unfortunaly, this process take about 8-15 seconds.
 * _"Sometimes, the dash button doesn't change the light state, why?"_ Sometimes (rarely), the server cannot not detect the packets.


# License
This code use the [MIT License](LICENSE).
