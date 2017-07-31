import multer from 'multer';

let mul = {
	storage : multer.diskStorage({
	  destination: function (req, file, cb) {
	    cb(null, '/tmp/my-uploads')
	  },
	  filename: function (req, file, cb) {
	    cb(null, file.fieldname + '-' + Date.now())
	  }
	}),
 	upload : multer({ storage: storage })
}

export default mul;