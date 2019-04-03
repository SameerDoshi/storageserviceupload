# Azure Storage SDK (JavaScript) and Angular JS

## What is this?
This is a sample app, run in the Browser that uses the [Azure Storage SDK for JavaScript](https://github.com/Azure/azure-storage-js) to upload and download files from Azure Blob storage.
See it in action [here](https://serviceupload.azurewebsites.net/)

## Building Locally
1. clone the repo
2. `npm install gulp` (and other packaages listed in [azure-pipelines.yml](https://github.com/SameerDoshi/storageserviceupload/blob/master/azure-pipelines.yml)
3. Change app/ui-select/ui-select.component.js by changing self.saurl , self.sas, self.data to your storage account baseurl, the sas token from the same storage account, and the name of a container in the storage account.
3. run `gulp default-dev` 
4. point index.html to dist/app.js 
5. Launch index.html
6. _optional_ run `gulp watch` and dev away

## Some things to note
* **This isn't production ready code.  This is a sample app.**
* Most of the functions that interact with blob are copy/pasta from the sample app
* You should note that both the file uploader and downloader use the same sas token. You should probably use Azure AD Auth, or at the very least use two SASToken with more fine grained privileges (a token with READ/Create and another with LIST/DOWNLOAD)
* You will notice that the SAS token is exposed in the download link
* You may notice that the app goes through every file in the container to find the file of interest.  This will not scale.
* You may notice that the azure storage sdk is loaded using a global variable instead of dependency injection.  [This article notes why this is bad practice and provides a more elegant approach](https://www.jvandemo.com/how-to-properly-integrate-non-angularjs-libraries-in-your-angularjs-application/)
* You may notice that every new upload stomps old uploads (that's probably easily solved!)
* There is no error handling 

## Contributing
Just submit a PR
