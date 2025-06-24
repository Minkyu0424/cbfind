import type { CommentProps } from "../components/detail/Comment/Comment";
import type { ItemTypes } from "../types/common";

export const MockItems: ItemTypes[] = [
  {
    id: 1,
    title: "에어팟 프로",
    content:
      "학생회관 1층 로비에서 에어팟 프로를 주웠습니다. 흰색 케이스에 귀에 꽂는 부분이 조금 지저분해 보였지만, 작동은 정상적으로 되는 것 같았습니다. 에어팟 프로는 오늘 오후 2시 30분쯤 학생회관 1층 커피 자판기 옆 벤치 위에서 발견했습니다. 혹시 분실하신 분은 학생회관 1층 경비실에 문의해주시면 감사하겠습니다.",
    image: "/mockItem.png",
    place: "학생회관",
    date: "2025-06-18 14:30",
    user: {
      id: 101,
      name: "김민지",
      profileImage: "/profile1.jpg",
    },
    views: 124,
    chatCount: 3,
  },
  {
    id: 2,
    title: "아이패드",
    content:
      "오늘 오전 중도 2층 열람실에서 아이패드를 발견했습니다. 아이패드는 회색 케이스에 들어 있었으며, 잠금화면에는 강아지 사진이 있었습니다. 혹시 분실하신 분은 중앙도서관 2층 안내 데스크에 문의해주시면 감사하겠습니다. 아이패드에는 개인정보가 많을 수 있으니, 빠르게 찾아가시길 바랍니다.",
    image: "/mockipad.jpg",
    place: "중앙도서관",
    date: "2025-06-17 10:15",
    user: {
      id: 102,
      name: "이준호",
      profileImage: "/profile1.jpg",
    },
    views: 98,
    chatCount: 2,
  },
  {
    id: 3,
    title: "검정 우산",
    content:
      "농생대 앞 벤치에 검정색 우산이 놓여 있었습니다. 우산은 접혀져 있었고, 손잡이 부분에 약간의 흠집이 있었습니다. 오늘 오후 4시 5분쯤 농생대 정문 옆 벤치에서 발견했습니다. 우산을 분실하신 분은 농생대 학생회실에 문의해주시면 좋겠습니다. 비 오는 날씨에 꼭 필요하실 것 같아요!",
    image: "/mockumb.jpeg",
    place: "농생대",
    date: "2025-06-16 16:05",
    user: {
      id: 103,
      name: "박서윤",
      profileImage: "/profile1.jpg",
    },
    views: 76,
    chatCount: 1,
  },
  {
    id: 4,
    title: "지갑",
    content:
      "정문 버스정류장 근처에 지갑이 떨어져 있었습니다. 지갑은 검정색 가죽으로 되어 있고, 안에는 신분증과 카드 몇 장이 들어 있었습니다. 오늘 아침 8시 20분쯤 발견했습니다. 분실하신 분은 정문 경비실에 연락해주시면 빠르게 찾아가실 수 있을 것 같습니다. 개인정보 보호를 위해 신분증 이름은 공개하지 않겠습니다.",
    image: "/mockpurse.jpg",
    place: "정문 버스정류장",
    date: "2025-06-15 08:20",
    user: {
      id: 104,
      name: "최현우",
      profileImage: "/profile1.jpg",
    },
    views: 145,
    chatCount: 4,
  },
  {
    id: 5,
    title: "보조배터리",
    content:
      "기계관 1층 자판기 위에 보조배터리가 올려져 있었습니다. 보조배터리는 흰색에 용량이 10000mAh 정도로 보이며, 충전 케이블이 함께 있었습니다. 오늘 오후 1시 45분쯤 발견했습니다. 혹시 분실하신 분은 기계관 1층 경비실에 문의해주시면 감사하겠습니다. 보조배터리는 평소에 자주 필요하실 것 같아요!",
    image: "/mockbat.jpg",
    place: "기계관",
    date: "2025-06-14 13:45",
    user: {
      id: 105,
      name: "정예은",
      profileImage: "/profile1.jpg",
    },
    views: 89,
    chatCount: 0,
  },
  {
    id: 6,
    title: "노트북",
    content:
      "공대 7호관 2층 강의실에서 노트북을 주웠습니다. 노트북은 은색에 애플 로고가 있는 맥북으로 보이며, 케이스는 없었습니다. 오늘 오전 11시 10분쯤 강의가 끝난 후 책상 위에 방치되어 있었습니다. 분실하신 분은 공대 7호관 경비실에 연락해주시면 빠르게 찾아가실 수 있습니다. 중요한 자료가 있을 수 있으니 신속히 찾아가시길 바랍니다.",
    image: "/mock note.jpg",
    place: "공대7호관",
    date: "2025-06-13 11:10",
    user: {
      id: 106,
      name: "한지훈",
      profileImage: "/profile1.jpg",
    },
    views: 200,
    chatCount: 5,
  },
  {
    id: 7,
    title: "스마트워치",
    content:
      "운동장 트랙 주변에서 스마트워치를 발견했습니다. 스마트워치는 검정색 밴드에 애플 워치로 보이며, 화면에는 시간과 날짜가 표시되어 있었습니다. 오늘 오후 3시 25분쯤 운동장 입구 근처에서 주웠습니다. 혹시 분실하신 분은 운동장 관리실에 문의해주시면 감사하겠습니다. 건강 관리에 필수인 아이템이니 꼭 찾아가시길 바랍니다!",
    image: "/mockwatch.jpg",
    place: "운동장",
    date: "2025-06-12 15:25",
    user: {
      id: 107,
      name: "서하은",
      profileImage: "/profile1.jpg",
    },
    views: 73,
    chatCount: 2,
  },
  {
    id: 8,
    title: "이어폰",
    content:
      "학생회관 1층 화장실 앞 복도에서 이어폰을 주웠습니다. 이어폰은 흰색에 애플 에어팟처럼 생겼으며, 오른쪽 이어폰만 있었습니다. 오늘 오전 9시 50분쯤 화장실 앞 바닥에서 발견했습니다. 혹시 분실하신 분은 학생회관 1층 경비실에 문의해주시면 감사하겠습니다. 이어폰 한쪽만 있으니 다른 한쪽도 찾으시길 바랍니다.",
    image: "/mockwar.jpg",
    place: "학생회관",
    date: "2025-06-11 09:50",
    user: {
      id: 108,
      name: "조민재",
      profileImage: "/profile1.jpg",
    },
    views: 65,
    chatCount: 1,
  },
  {
    id: 9,
    title: "필통",
    content:
      "중앙도서관 3층 그룹스터디룸에서 필통을 발견했습니다. 필통은 파란색에 동물 캐릭터가 그려져 있으며, 안에는 볼펜, 샤프, 지우개 등이 들어 있었습니다. 오늘 오후 5시 40분쯤 스터디룸 책상 위에 방치되어 있었습니다. 혹시 분실하신 분은 중앙도서관 3층 안내데스크에 문의해주시면 감사하겠습니다. 필기구가 꼭 필요하실 것 같아요!",
    image: "/mockpen.jpg",
    place: "중앙도서관",
    date: "2025-06-10 17:40",
    user: {
      id: 109,
      name: "이수빈",
      profileImage: "/profile1.jpg",
    },
    views: 52,
    chatCount: 0,
  },
  {
    id: 10,
    title: "휴대폰",
    content:
      "후문 근처 벤치에서 휴대폰을 주웠습니다. 휴대폰은 검정색 케이스에 들어 있었으며, 잠금화면에는 가족 사진이 있었습니다. 오늘 저녁 7시 5분쯤 후문 버스정류장 옆 벤치에서 발견했습니다. 혹시 분실하신 분은 후문 경비실에 문의해주시면 감사하겠습니다. 중요한 연락이 있을 수 있으니, 빠르게 찾아가시길 바랍니다.",
    image: "/mockphone.jpg",
    place: "후문",
    date: "2025-06-09 19:05",
    user: {
      id: 110,
      name: "홍길동",
      profileImage: "/profile1.jpg",
    },
    views: 190,
    chatCount: 6,
  },
];

export const MockComments: CommentProps[] = [
  {
    user: {
      id: 1,
      name: "김민수",
      profileImage: "/profile1.jpg",
    },
    comment: {
      commentId: 101,
      content: "좋은 정보 감사합니다!",
      createdAt: "2025-06-24T10:30:00",
    },
  },
  {
    user: {
      id: 2,
      name: "이서연",
      profileImage: "/profile2.jpg",
    },
    comment: {
      commentId: 102,
      content: "이거 어디서 찾으셨나요?",
      createdAt: "2025-06-24T10:35:00",
    },
  },
  {
    user: {
      id: 3,
      name: "박준형",
      profileImage: "/profile3.jpg",
    },
    comment: {
      commentId: 103,
      content: "혹시 습득하신 장소가 어딘가요?",
      createdAt: "2025-06-24T11:00:00",
    },
  },
  {
    user: {
      id: 4,
      name: "정하늘",
      profileImage: "/profile4.jpg",
    },
    comment: {
      commentId: 104,
      content: "감사합니다! 꼭 찾길 바랄게요.",
      createdAt: "2025-06-24T11:20:00",
    },
  },
  {
    user: {
      id: 5,
      name: "한지우",
      profileImage: "/profile5.jpg",
    },
    comment: {
      commentId: 105,
      content: "신고했어요. 조심하세요!",
      createdAt: "2025-06-24T11:40:00",
    },
  },
  {
    user: {
      id: 6,
      name: "최지훈",
      profileImage: "/profile6.jpg",
    },
    comment: {
      commentId: 106,
      content: "도움이 되셨다면 다행입니다 :)",
      createdAt: "2025-06-24T12:00:00",
    },
  },
];
