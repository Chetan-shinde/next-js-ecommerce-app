import Dropzone from "dropzone";
import { useEffect } from "react";
import Cropper from "cropperjs";
import "./cropper.css";
import { Controller } from "react-hook-form";

function dropZoneinitOptions(element, cb) {
  var d = new Dropzone(element, {
    url: "/questions",
    paramName: "file",
    addRemoveLinks: true,
    previewTemplate: `<div class="dz-preview dz-file-preview">
		  <div class="dz-details">
			<img data-dz-thumbnail />
		  </div>
		  <div ></div>
		  <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
		  <div class="dz-error-message"><span data-dz-errormessage></span></div>
		</div>`,
    transformFile: (file, done) => {
      var editor = document.createElement("div");
      editor.style.position = "fixed";
      editor.style.left = 0;
      editor.style.right = 0;
      editor.style.top = 0;
      editor.style.bottom = 0;
      editor.style.zIndex = 9999;
      editor.style.backgroundColor = "#000";
      document.body.appendChild(editor);

      var buttonConfirm = document.createElement("button");
      buttonConfirm.style.position = "absolute";
      buttonConfirm.style.left = "10px";
      buttonConfirm.style.top = "10px";
      buttonConfirm.style.zIndex = 9999;
      buttonConfirm.textContent = "Confirm";
      editor.appendChild(buttonConfirm);
      buttonConfirm.addEventListener("click", function () {
        // Remove the editor from the view
        var canvas = cropper.getCroppedCanvas({
          minWidth: 256,
          minHeight: 256,
        });
        canvas.toBlob(function (blob) {
          d.createThumbnail(
            blob,
            d.options.thumbnailWidth,
            d.options.thumbnailHeight,
            d.options.thumbnailMethod,
            false,
            function (dataURL) {
              d.emit("thumbnail", file, dataURL);
              done(blob);
            }
          );
        });
        document.body.removeChild(editor);

        file.previewElement.parentNode.getElementsByClassName(
          "dz-message"
        )[0].style.display = "none";
        cb(file);
        console.log(file);
      });

      // Create an image node for Cropper.js
      var image = new Image();
      image.src = URL.createObjectURL(file);
      editor.appendChild(image);

      var cropper = new Cropper(image, { aspectRatio: 1 });
    },
    removedfile: (file) => {
      if (
        file.previewElement != null &&
        file.previewElement.parentNode != null
      ) {
        file.previewElement.parentNode.getElementsByClassName(
          "dz-message"
        )[0].style.display = "block";
        file.previewElement.parentNode.removeChild(file.previewElement);
      }
    },
  });
  return d;
}

function dataURItoBlob(dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(",")[1]);

  // separate out the mime component
  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  var ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  var blob = new Blob([ab], { type: mimeString });
  return blob;
}

export default function ImgQue({ que, showNextQuestion, control, setValue }) {
  function handleupload(file) {
    showNextQuestion(que);
    let b = dataURItoBlob(file.dataURL);
    setValue("file", b);
  }

  useEffect(() => {
    //Dropzone.autoDiscover = false;
    let myDropZone = null;
    if (!myDropZone) {
      myDropZone = dropZoneinitOptions(`div#img_${que.id}`, handleupload);
    }
    () => {
      myDropZone = null;
    };
  }, []);

  return (
    <div className="image_que que">
      <h5>{que.que}</h5>
      <Controller
        name="file"
        control={control}
        render={({ field }) => (
          <div id={`img_${que.id}`} className="dropzone">
            <div className="dz-message" data-dz-message>
              <button type="button" className="btn btn-primary btn-sm">
                Upload picture
              </button>
            </div>
          </div>
        )}
      />
    </div>
  );
}
