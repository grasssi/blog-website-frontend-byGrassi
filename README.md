
**blog-website** is one of my personal projects where registered blogger write blogs. Bloggers can also comment or react to blogs. This repository holds the code of it's frontend which is developed using **Angular**.

<em> The backend of this project can be found [here (REST API)](https://github.com/grasssi/blog-website-backend) </em>


## Features:
- bloggers can create their profiles (token based authentication)
- bloggers can edit their profile
- bloggers can write blogs. They can set the category of their blog (i.e. travel, medical, tech etc)
- registered bloggers can comment on their own or others blog
- registered bloggers can also react on others blog. They can react **like**, **sad** to blogs
- unregistred public users can read blogs but cann't comment or react n blogs
- Blogs of a particular category can be viewed


# Getting started

## How to install & run:
### Using Git (recommended)
   Navigate & open CLI into the directory where you want to put this project & Clone this project (will be cloned inside myProject folder) using this command.
   
```bash
git clone https://github.com/grasssi/blog-website-frontend-byGrassi.git
```
### Using manual download ZIP
1. Download repository
2. Extract the zip file, navigate into it & copy the folder to your desired directory

### Install npm dependencies after cloning or downloading
```bash
npm install
```

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
```bash
ng serve
```

