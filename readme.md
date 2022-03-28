[![LinkedIn][linkedin-shield]][linkedin-url]


<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://1drv.ms/u/s!Ar_vfbHCB9exc2gL-vC3tKlqaXo?e=QzYVfC">
    <img src="https://i.pinimg.com/originals/1f/3f/4c/1f3f4ce973d946578567f190e2773709.png" alt="Logo" width="180" height="150">
  </a>

  <h3 align="center">Todo App</h3>

  
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
* Project aims at user interaction with Todo List Via Board.
* User can add, read , update or delete a Board or a Task under a Board.



Functionalities:
* User needs to authorize first.
* After authorization user can add, read, update or delete the task or a board
* If user is not authorised or parameters passed are not appropriate then error will be shown

### Built With
[NodeJs]    
[Javascript]  
[MongoDB]
[JWT]
[BCRYPTJS]

<!-- GETTING STARTED -->
## Getting Started

Want to run on your device locally??    
Follow the procedure below

### Prerequisites

1. Install nodeJs
2. Clone the repo
3. run command: cd TodoApp
4. run command: npm start
5. Voilla! application is UP


### Installation

Clone the repo
   ```sh
   gh repo clone asheeshsingh1/TodoApp
   ```



## Postman Collection

Link : https://www.getpostman.com/collections/1f521a97d476a357f9b3

## Schema
Please visit : 
https://dbdiagram.io/d/624200f0bed61838731308d7


## Meta Info
* Currently the apps supports simple interaction of user with boards and task on boards
* Later every time when a user creates a board we create Document in the MongoDB collection and same is being done for a task.
* So from tasks collection, we will be able to fetch:

<ol>
    <li>All the tasks created by the user</li>
    <li>Particular created by the user</li>
</ol>

* Instead of storing plain password in database, we can store hashed password using bcryptjs library of JS. While authenticating the user we can simple match the hashed password with the password stored in DB.
* We can also add a default page for requests that does not map for any url.

<!-- CONTACT -->
## Contact

Asheesh Singh - [Linked in](https://github.com/asheeshsingh1/)




[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://github.com/asheeshsingh1/
© 2022 GitHub, Inc.
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
