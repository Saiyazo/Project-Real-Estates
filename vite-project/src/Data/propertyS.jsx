const properties = [ 
  {
    "id": 1,
    "listingNumber": "LST0001",
    "image": "https://images.unsplash.com/photo-1586105251261-72a756497a11?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "title": "ขายคอนโดใจกลางเมือง ใกล้ BTS สยาม",
    "propertyCode": "PROP001",
    "posterName": "สมชาย ใจดี",
    "userId": "USR1001",
    "type": "คอนโดมิเนียม",
    "province": "กรุงเทพมหานคร",
    "datePosted": "2025-11-12",
    "listingType": "ขาย",
    "status": "ขายออก"
  },
  {
    "id": 2,
    "listingNumber": "LST0002",
    "image": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "title": "บ้านเดี่ยว 2 ชั้น พร้อมสวนส่วนตัว",
    "propertyCode": "PROP002",
    "posterName": "ศิริพร รักบ้าน",
    "userId": "USR1002",
    "type": "บ้านเดี่ยว",
    "province": "เชียงใหม่",
    "datePosted": "2025-11-13",
    "listingType": "ขาย",
    "status": "ขายออก"
  },
  {
    "id": 3,
    "listingNumber": "LST0003",
    "image": "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "title": "ที่ดินเปล่า 1 ไร่ ใกล้ถนนใหญ่",
    "propertyCode": "PROP003",
    "posterName": "วรพงศ์ ดินดี",
    "userId": "USR1003",
    "type": "ที่ดิน",
    "province": "ขอนแก่น",
    "datePosted": "2025-11-14",
    "listingType": "ขาย",
    "status": "ขายออก"
  },
  {
    "id": 4,
    "listingNumber": "LST0004",
    "image": "https://images.unsplash.com/photo-1599423300746-b62533397364?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "title": "อาคารพาณิชย์ 3 ชั้น เหมาะทำร้านค้า",
    "propertyCode": "PROP004",
    "posterName": "กมลวรรณ พาณิชย์",
    "userId": "USR1004",
    "type": "อาคารพาณิชย์",
    "province": "ภูเก็ต",
    "datePosted": "2025-11-15",
    "listingType": "ขาย",
    "status": "ขายไม่ออก"
  },
  {
    "id": 5,
    "listingNumber": "LST0005",
    "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "title": "ทาวน์โฮมใหม่ โครงการติดถนนใหญ่",
    "propertyCode": "PROP005",
    "posterName": "ธันวา บ้านใหม่",
    "userId": "USR1005",
    "type": "ทาวน์โฮม",
    "province": "นครราชสีมา",
    "datePosted": "2025-11-15",
    "listingType": "ขาย",
    "status": "ขายไม่ออก"
  },
  {
    "id": 6,
    "listingNumber": "LST0006",
    "image": "https://images.unsplash.com/photo-1600585154340-1a55d6c09fa2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "title": "บ้านสวยพร้อมสวนสาธารณะ",
    "propertyCode": "PROP006",
    "posterName": "สมชาย ใจดี",
    "userId": "USR1001",
    "type": "บ้านเดี่ยว",
    "province": "ชลบุรี",
    "datePosted": "2025-11-16",
    "listingType": "ขาย",
    "status": "พึ่งประกาศ"
  },
  {
    "id": 7,
    "listingNumber": "LST0007",
    "image": "https://images.unsplash.com/photo-1600585154340-6f12efb20c2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "title": "คอนโดหรูวิวเมือง",
    "propertyCode": "PROP007",
    "posterName": "ศิริพร รักบ้าน",
    "userId": "USR1002",
    "type": "คอนโดมิเนียม",
    "province": "กรุงเทพมหานคร",
    "datePosted": "2025-11-16",
    "listingType": "ขาย",
    "status": "พึ่งประกาศ"
  },
  {
    "id": 8,
    "listingNumber": "LST0008",
    "image": "https://previews.123rf.com/images/jittawit/jittawit2201/jittawit220100483/180327190-land-for-sale-sign-against-trimmed-lawn-background-empty-dry-cracked-swamp-reclamation-soil-land.jpg",
    "title": "ที่ดินพร้อมปลูกบ้าน",
    "propertyCode": "PROP008",
    "posterName": "วรพงศ์ ดินดี",
    "userId": "USR1003",
    "type": "ที่ดิน",
    "province": "นครราชสีมา",
    "datePosted": "2025-11-17",
    "listingType": "ขาย",
    "status": "พึ่งประกาศ"
  }
];

export function fetchPropertys() {
  return properties;
}
