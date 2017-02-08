var app = angular.module('app');
app.component('uploadComponent', {
    
    // isolated scope binding
    bindings: {
        label: '@',
        url: '@',
        loading: '=?',
        progress: '=?'

    },

    // Inline template which is binded to message variable
    // in the component controller
    templateUrl: '/App/UploadTemplate.html',

    // The controller that handles our component logic
    controller: UploadComponentController

});
function UploadComponentController($timeout) {

    var self = this;
    self.label = "";
    self.url = "";

    self.files = [];
    self.currentFile = {};
    this.$onInit = function () {
        
        self.progress = 0;
        self.fileUpload = {
            url: this.url,
            options: {
              filters: {
                  mime_types: [{title: 'PDF Files', extensions: 'pdf'}]
              }  
            },
            callbacks: {
                queueChanged: function(uploader) {
                    console.log('Queue Changed');
                    self.files = self.files.concat(uploader.files);
                    console.log(self.files);
                },
                filesAdded: function (uploader, files) {
                    self.loading = true;
                    $timeout(function () {
                        uploader.start();
                    }, 1);
                },
                uploadProgress: function (uploader, file) {
                  
                },
                fileUploaded: function (uploader, file, response) {
                   self.loading = false;
                   file.uploadedSuccessfully = true;
                    console.log(response);
                    },
                uploadFile: function(uploader, file) {
                    self.currentFile = file;
                },
                error: function (uploader, error) {
                    self.loading = false;
                    console.log(error);
                    console.log(self.currentFile);
                   
                    if (error.response) {
                        self.currentFile.uploadError = JSON.parse(error.response).Message;
                    } else {
                        if (error.file) {
                            self.currentFile = error.file;
                            self.files.push(self.currentFile);
                        }
                        self.currentFile.uploadError = error.message;
                    }
                    self.currentFile.uploadFailed = true;
                    console.log(self.currentFile);
                }
            }
        }
        console.log(this.fileUpload);
       
    }
}