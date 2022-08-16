var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //thư mục lưu
    cb(null, 'public/upload');
  },
  filename: function (req, file, cb) {
    // tên file

      cb(null, file.originalname)

  }
});
var upload = multer({storage: storage});


const mongoose = require('mongoose')
const {Schema} = mongoose;
const uri = "mongodb+srv://trungnv2409:trungnvph15459@cluster0.y2gtt.mongodb.net/demo?retryWrites=true&w=majority";
mongoose.connect(uri).catch(err => console.log('abc ' + err));
const Baiviet = new Schema({
  tieude: String,
  noidung: String,
  baiviet: String,
  urlAvata:String
})
const bv = mongoose.model('baiviets', Baiviet);


/* GET home page. */
router.get('/', function(req, res, next) {
  bv.find({}, function (error, result) {
    res.render('index', {Title: result.length})
  })
  // res.render('index', { title: 'Express' });
});
router.get('/add', function (req, res) {
  res.render('add');
});
router.post('/addbaiviet',upload.single('anh'),async function (req, res) {
  var tieude = req.body.tieude;
  var noidung = req.body.noidung;
  var baiviet = req.body.baiviet;
  var urlAvata=req.file.path;
  console.log(urlAvata);

  const baiViet = new bv({
    tieude: tieude,
    noidung: noidung,
    baiviet: baiviet,
    urlAvata: urlAvata.slice(7)
  })
  await baiViet.save();

  // lấy lại danh sách và hiển thị trên trang index
  bv.find({}, function (error, result) {
    res.render('index', {Title: result.length})
  })
})
router.get('/get',function (req,res) {
  bv.find({}, function (error, result) {
    res.render('baiviet', {data: result})
  })
})
router.get('/getUsers', function (req, res) {
  bv.find({}, function (error, result) {
    res.send(result);
  })
})
module.exports = router;
