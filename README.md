<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h1 align="center">Vitaly's Portfolio ✨</h1>

  <p align="center">
    It is a personal static website/portfolio hosted with GitHub Pages. 
    Based on the template created by <a href="https://hashirshoaeb.github.io/home">hashirshoaeb.github.io/home</a>.
    <br/>
    <strong>Site URLs » </strong> 
    <br />
    <strong>1. </strong> <a href="https://skuill.github.io/portfolio">skuill.github.io/portfolio</a>
    <br />
    <strong>2. </strong> <a href="https://skuill.com/">skuill.com</a>
    <br />
    <br />
    <a href="https://skuill.github.io/portfolio/#aboutme">About Me</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About the project</a>
      <ul>
        <li>
          <a href="#technology-stack-">Technology Stack 🛠️</a>
        </li>
        <li>
          <a href="#structure-">Structure ⚓</a>
        </li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting started 💗</a>
      <ul>
        <li>
          <a href="#prerequisites-">Prerequisites 🍪</a>
        </li>
        <li>
          <a href="#setup-and-deployment-">Setup And Deployment 🔧</a>
        </li>
      </ul>
    </li>
    <li>
      <a href="#support-my-work">Support my work</a>
    </li>
  </ol>
</details>

# About the project

[![Site preview](/public/social-image.png)](https://skuill.github.io/portfolio)


## Technology stack 🛠️

Dependencies defined in package.json:

[Reactjs](https://reactjs.org/)
| [Bootstrap](https://getbootstrap.com/)
| [Typist](https://github.com/jstejada/react-typist)
| [GitHub API](https://developer.github.com/v3/repos/)
| [Instagram API](https://www.instagram.com/developer/embedding/)

# Getting started 💗

Project is open source. Feel free to make your own version. All you need to do is to fork this repository, edit [src/editable-stuff/config.js](./src/editable-stuff/config.js) and add resume. Mark star ⭐ if you like the project.

## Prerequisites 🍪

You should have [Node.js](https://nodejs.org/en/) and [Git](https://git-scm.com/) installed on your PC. You should also own a GitHub account.

## Setup And Deployment 🔧

### How to fork and make changes
1. To Get Started, Fork this repository to your GitHub account:
2. Clone the forked repo from your account using:

   ```bash
     git clone https://github.com/<your-username>/portfolio.git
   ```

3. Open in editor and edit [src/editable-stuff/config.js](./src/editable-stuff/config.js) file.

4. Add your resume as <resume.pdf> in place of [src/editable-stuff/resume.pdf](./src/editable-stuff/)

5. Edit [title](./public/index.html#L34) and meta [description](./public/index.html#L13) in [public/index.html](./public/index.html).
6. Change URL in [package.json](./package.json) file:

   ```json
    "homepage": "https://<your-username>.github.io/portfolio"
   ```

   Or for deployment at custom domain, refer [create-react-app.dev](https://create-react-app.dev/docs/deployment/#step-1-add-homepage-to-packagejson)

### How to run locally

After editing run the following bash commands (visit site locally: http://localhost:3000/portfolio/):

   ```bash
   npm install
   npm start
   ```
   
### Manual deployment
To deploy website, run:

   ```bash
    npm run build
    npm run deploy
   ```

Or for deployment at \<username>.github.io, refer [READMEdocs/custom-deployment.md](./READMEdocs/custom-deployment.md) and [pages.js](./pages.js)

For containerized and deploy in docker refer [READMEdocs/docker-deployment.md](./READMEdocs/docker-deployment.md)

### Automatic deployment

To automatically build and deploy the website from the `master` branch using GitHub Actions:

1. **Set the release version** in [`package.json`](https://github.com/skuill/portfolio/blob/master/package.json) under the `version` field.
2. **Create a new release** on the [Releases page](https://github.com/skuill/portfolio/releases) using a new version tag.

The latest changes will be deployed automatically via the [GitHub Actions workflow](https://github.com/skuill/portfolio/blob/master/.github/workflows/build-and-deploy.yml).

### Additional information

1. Congrats your site is up and running. To see it live, visit:

   ```https
     https://<your-username>.github.io/portfolio
   ```

2.. To change the thumbnail image:

    - Navigate to the "public" folder.  
    - There you will see "social-image.png".  
    - Delete it.   
    - Take a screenshot of your version and rename it "social-image.png" and place it there.  
    
   Next time if you make changes, repeat using deployment steps.

Facing issues? Feel free to contact at sativkv@gmail.com or [telegram](https://t.me/skuill).

# Support my work

If you found this project valuable, please consider giving it a ⭐️ on GitHub. Your support keeps me motivated! If you'd like to further support my work, you can buy me a coffee. Thank you for your generosity!

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/skuill)
