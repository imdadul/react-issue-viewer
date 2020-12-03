# `React Issue Viewer`
This project lists downs all the issues from facebook/react.
User can filter the issues by title/body/issue type. User can also go to the details of the issue where he read the body and comments.

# `Tech stack`

1. React typescript
2. Apollo Client
3. Github graph api
4. Webpack
5. CD to Heroku https://react-issue-viewer.herokuapp.com/

# `Steps to run`
1. `git clone https://github.com/imdadul/react-issue-viewer.git`
2.  Create `.env` file and put inside the folder. Enter the graph api url and authorization token.
   
   Example `.env file 
   REACT_APP_API_URL=https://api.github.com/graphql
    REACT_APP_TOKEN=GITHUB_PERSONAL_ACCESS_TOKEN` 
3. `npm i`
4. `npm run dev`
