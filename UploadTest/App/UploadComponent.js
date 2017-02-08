var app = angular.module('app');
app.component('uploadComponent', {
    
    // isolated scope binding
    bindings: {
        message: '@',
        url: '@',
        loading: '=',
        progress: '=?'

    },

    // Inline template which is binded to message variable
    // in the component controller
    template: '<a class="btn btn-primary" plupload-options="$ctrl.fileUpload.options" plupload-callbacks="$ctrl.fileUpload.callbacks" plupload="$ctrl.url">{{$ctrl.message}}</a><p>{{$ctrl.progress}}</p>',

    // The controller that handles our component logic
    controller: UploadComponentController

});
function UploadComponentController($timeout) {
    this.message = "";
    this.url = "";
  
    this.$onInit = function () {
        this.progress = 0;
        this.fileUpload = {
            url: this.url,
            options: {
              filters: {
                  mime_types: [{title: 'PDF Files', extensions: 'pdf'}]
              }  
            },
            callbacks: {
                queueChanged: function(uploader) {
                    console.log('Queue Changed');
                    console.log(uploader);
                },
                filesAdded: function (uploader, files) {
                    this.loading = true;
                    console.log('Files added');
                    console.log(files);
                    $timeout(function () {
                        uploader.start();
                    }, 1);
                },
                uploadProgress: function (uploader, file) {
                    var percentage = file.percent / 100.0;
                    console.log(percentage);
                    this.progress = percentage;
                },
                fileUploaded: function (uploader, file, response) {
                   this.loading = false;
                    alert('Upload Complete!');
                },
                error: function (uploader, error) {
                   this.loading = false;
                    alert(error.message);
                }
            }
        }
        console.log(this.fileUpload);
       
    }
}