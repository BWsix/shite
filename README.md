# Shite.

The Next Generation of Social Media created using create-react-app.  
https://bwsix.github.io/shite/  
and here's my [**Shite.** personal page](https://bwsix.github.io/shite/user/CaFMHgWplVUwzB1noFR3d6T6deN2)

## Features / Screenshots

### Customizable personal page

![](https://i.imgur.com/UtyiXzS.png)

### Markdown support & YouTube video auto embed

![](https://i.imgur.com/zV4PA7K.png)

### Real-time comment section

![](https://i.imgur.com/8fvBkHm.png)

### Different color scheme

![](https://i.imgur.com/HAu4d8k.png)

## Special Thanks

[@d071] for providing me ideas about the comment section update  
[@storiesbang] for helping me find out the bugs in the post system

and everyone who joined **Shite.**

[@d071]: https://github.com/d071 "d071's GitHub page"
[@storiesbang]: https://github.com/storiesbang "storiesbang's GitHub page"

<details><summary>Dev log</summary>

**(I'm currently taking a break from this project.)**

## TODO

- **image uploader**
  - dnd image uploader
- comment section
  - comment edition
  - comment deletion
- user icon hover info(popup)
- visitor mode

## Next Step

- comment
  - reaction
  - reply
- chatroom
  - 1v1 chat
  - group chat
- follower system

## Dev Log

2021/7/31

Playing around with socket.io in the past 2 days.

- "Login Anonymously"

2021/7/27

Maybe it is time to move on to the next project.

- **post**
  - post content markdown support
  - youtube video auto embed

2021/7/26

- **user page**
  - bio
  - cover image
- **post**
  - upload image from clipboard

2021/7/25

- **comment section**
  - infinite scroll up (view previous)
  - "scroll to bottom" button
  - highlight new comments
- **user page**
  - all posts by the user

2021/7/24

- added different themes
  - dark mode(default)
  - light mode
- share post button & link
- **image uploader**
  - image resize & aspect ratio limitation

2021/7/23

minor changes/features in the morning  
refactor the entire(almost) project in the rest of the day

- navbar auto hide when scroll down
- url highlight
- **comment section**
  - `enter` comment
  - `shift`+`enter` new line
- **post system**
  - comment/reaction count realtime update(after comment section being toggled)
- **refactor**
  - store `auth.user` & `post` using `useContent`
- **restructure**
  - put everything related to `post` into one folder
- post page (displays single post)

2021/7/22

- **post system**
  - realtime update _refactor_
  - post edition
  - post deletion confirm box
- **comment section**
  - "view previous comments" button
  - auto scroll up when publish comment
- meta tags

2021/7/21

- **post system**
  - post deletion
  - pending/trailing spaces removal
  - reaction
- **comment section**
  - realtime update

2021/7/20

- **post system**
  - realtime update
  - infinite scroll

2021/7/19

- **post system**
- navbar drop down menu
- page styling

</details>
