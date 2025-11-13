const properties = [
   {
    "id": 1,
    "image": "https://example.com/images/property1.jpg",
    "title": "ขายคอนโดใจกลางเมือง ใกล้ BTS สยาม",
    "propertyCode": "PROP001",
    "posterName": "สมชาย ใจดี",
    "userId": "USR1001",
    "type": "คอนโดมิเนียม",
    "province": "กรุงเทพมหานคร"
  },
  {
    "id": 2,
    "image": "https://example.com/images/property2.jpg",
    "title": "บ้านเดี่ยว 2 ชั้น พร้อมสวนส่วนตัว",
    "propertyCode": "PROP002",
    "posterName": "ศิริพร รักบ้าน",
    "userId": "USR1002",
    "type": "บ้านเดี่ยว",
    "province": "เชียงใหม่"
  },
  {
    "id": 3,
    "image": "https://example.com/images/property3.jpg",
    "title": "ที่ดินเปล่า 1 ไร่ ใกล้ถนนใหญ่",
    "propertyCode": "PROP003",
    "posterName": "วรพงศ์ ดินดี",
    "userId": "USR1003",
    "type": "ที่ดิน",
    "province": "ขอนแก่น"
  },
  {
    "id": 4,
    "image": "https://example.com/images/property4.jpg",
    "title": "อาคารพาณิชย์ 3 ชั้น เหมาะทำร้านค้า",
    "propertyCode": "PROP004",
    "posterName": "กมลวรรณ พาณิชย์",
    "userId": "USR1004",
    "type": "อาคารพาณิชย์",
    "province": "ภูเก็ต"
  },
  {
    "id": 5,
    "image": "https://example.com/images/property5.jpg",
    "title": "ทาวน์โฮมใหม่ โครงการติดถนนใหญ่",
    "propertyCode": "PROP005",
    "posterName": "ธันวา บ้านใหม่",
    "userId": "USR1005",
    "type": "ทาวน์โฮม",
    "province": "นครราชสีมา"
  }
]

export function fetchPropertys(){
  return properties
}