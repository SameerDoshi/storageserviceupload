angular.
module('serviceView').
component('serviceView', {
        templateUrl: '/service-view/service-view.html',
        bindings: {
            saurl:'<',
            sas:'<',
            containername: '<'
        },
        controller: function ServiceViewViewController($window,$scope) {
            let self = this;
            self.caseid="";
            self.linkready=false;




            self.found=false;
            self.url="";
            self.name="";
            self.uploaded="";
            self.az=$window.azblob;


            self.casesubmit= function() {
              self.findblob().then(function(){
                  console.log("done");
                  $scope.url=self.url;
                    $scope.$applyAsync();
              });
            };
            self.findblob=async function(){
                self.found=false;
                self.url="";
                let az=self.az;
                console.log("submit: "+ self.caseid);
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
                let marker = undefined;
                do {
                    const listBlobsResponse = await containerURL.listBlobFlatSegment(
                        az.Aborter.none,
                        marker
                    );

                    marker = listBlobsResponse.nextMarker;
                    for (const blob of listBlobsResponse.segment.blobItems) {

                        if(blob.name == self.caseid+'.txt') {
                            self.found=true;
                            console.log(blob);
                            //self.url=blob;
                            let blobUrl = az.BlobURL.fromContainerURL(containerURL, blob.Name);
                            self.url=blobURL.url;
                            self.name=self.caseid;
                            self.uploaded=blob.properties.creationTime.toString();

                        }
                    }
                } while (marker);
                self.linkready=true;
            }

        }
    }
    );