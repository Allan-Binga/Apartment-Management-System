/* groovylint-disable-next-line CompileStatic */
pipeline {
    agent any
    tools {
        nodejs 'NodeJS 23'  // Use the Node.js version configured in Jenkins
    }
    stages {
        stage('Clone Repository') {
            steps {
                //CLONE GITHUB REPOSITORY
                git 'https://github.com/Allan-Binga/Apartment-Management-System'
            }
        }
        stage('Install Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }
        //  stage('Install Dependencies') {
        //     steps {
        //         dir('backend') {
        //             sh 'npm install'
        //         }
        //     }
        // }
        // stage('Run unit tests') {
        //     steps {
        //         dir('backend') {
        //             sh 'npm test'
        //         }
        //     }
        // }
    }
    post {
        success {
            slackSend(
                channel: '#murandi-apartments',
                color: 'good',
                message: 'Unit tests passed!'
            )
        }
        failure {
            slackSend(
                channel: "#murandi-apartments",
                color: 'danger',
                message: 'Unit tests failed.'
            )
        }
    }
}
