angular.
module('deviceView').
component('deviceView', {
        templateUrl: '/device-view/device-view.html',
        bindings: {
            saurl:'<',
            sas:'<',
            containername: '<'
        },
        controller: function DeviceViewController($scope,$window) {
            let self=this;

            self.caseid="";
            self.uploading=false;
            self.uploaded=false;
            self.uploadUrl="";
            self.contents="Hello from: " + new Date();;
            self.az=$window.azblob;

            self.casesubmit= function(){
                self.uploadBlob().then(function(){
                    $scope.$applyAsync();
                });
            };
            self.uploadBlob= async  function(){
                let az=self.az;
                self.uploading=true;
                self.uploaded=false;
                const anonymousCredential = new az.AnonymousCredential();
                const pipeline = az.StorageURL.newPipeline(anonymousCredential);

                const serviceURL = new az.ServiceURL(
                    // When using AnonymousCredential, following url should include a valid SAS or support public access
                    self.saurl+self.sas,
                    pipeline
                );
                const containerName = self.containername;
                const containerURL = az.ContainerURL.fromServiceURL(serviceURL, containerName);
                // create blob
                const content = "hello";
                const blobName = self.caseid+'.txt';
                const blobURL = az.BlobURL.fromContainerURL(containerURL, blobName);
                self.url=blobURL.url;
                const blockBlobURL = az.BlockBlobURL.fromBlobURL(blobURL);
                const uploadBlobResponse = await blockBlobURL.upload(
                    az.Aborter.none,
                    self.contents,
                    content.length
                );

                    console.log('then');

                    self.uploading=false;
                    self.uploaded=true;
                    self.uploadUrl=blobURL.url;
                    console.log("URL: "+ self.uploadUrl);






            }
        }
    }
    );