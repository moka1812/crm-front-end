export default [
  {
    name: 'DASHBOARD',
    icon: 'assessment',
    link: ''
    //link: '/dashboard',
  },
  {
    name: 'ORDERS',
    icon: 'email',
    groups: [
      {
        name: 'ALL ORDERS',
        icon: 'drafts',
        link: '/orders',
      },
      {
        name: 'MY INBOX',
        icon: 'assignment_ind',
        link: '/my_inbox',
      },
    ]
  },
  {
    name: 'HỢP ĐỒNG',
    icon: 'work',
    link: '/contracts',
  },
  {
    name: 'NHẮC LÃI',
    icon: 'notifications',
    link: '/interest-reminder',
  },
  {
    name: 'KHÁCH HÀNG',
    icon: 'person',
    link: '/customers',
  },
  // {
  //   name: 'CHAT ROOM',
  //   icon: 'forum',
  //   link: '/chat_room',
  // },
  // {
  //   name: 'MARKETING',
  //   icon: 'phonelink',
  //   link: '/marketing',
  // },
  // {
  //   name: 'DOCUMENTS',
  //   icon: 'description',
  //   link: '/documents',
  // },
  // {
  //   name: 'VALIDATOR',
  //   icon: 'image_search',
  //   link: '/validator',
  // },
  // {
  //   name: 'CALENDAR',
  //   icon: 'calendar_today',
  //   link: '/calendar',
  // },
  // {
  //   name: 'ADMIN',
  //   icon: 'settings',
  //   link: '/admin',
  // },
  
]
