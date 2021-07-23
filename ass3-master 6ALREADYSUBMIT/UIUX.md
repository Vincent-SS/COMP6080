The UI/UX design of this assignment was gradually upgradated as I implemented features.

For example, I started to build BigBrain without any external libraries (i.e. dependencies), so the UI was not attractive at the very begining. Then I added Material-UI as my components' decorations, however, I found the style was not very obvious. After considering the system was meant to be an Online Quiz system, so the links/buttons should be obvious and easy to follow. Eventually, I switched to react-bootstrap, which is not only attractive, but also more obvious to view.

In terms of style/color choosing, I designed BigBrain into dark mode, especailly for Tables, so to relax Admin's eyes. Besides, I grouped all buttons into 3 categories, which are Dangerous, Primary, and Secondary. Where Dangerous are those dangerous actions such as Log out or Delete a question/game etc; Primary buttons are those buttons with important functions, such as Login, Register and Start/Stop games etc; Secondary are mainly for buttons listed on top of each page, and I decided to use outline-color, so to reduce feeling of presence, and only show up when users want to interact with those buttons.

For accessibility requirement, I added a large font size titile for each page, so to inform users which page they are at. Users with eye disease could still enjoy BigBrain with ease. Additionally, the tables are in dark mode, so it can also help to comfort eyes.