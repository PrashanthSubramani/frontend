// Default menu settings configurations

export interface MenuItem {
  title: string;
  icon: string;
  page: string;
  isExternalLink?: boolean;
  issupportExternalLink?: boolean;
  isStarterkitExternalLink?: boolean;
  badge: { type: string, value: string };
  submenu: {
    items: Partial<MenuItem>[];
  };
  section: string;
}

export interface MenuConfig {
  horizontal_menu: {
    items: Partial<MenuItem>[]
  };
  vertical_menu: {
    items: Partial<MenuItem>[]
  };
}

export const MenuSettingsConfig: MenuConfig = {
  horizontal_menu: {  
    items: [
      {
        title: 'Dashboard',
        icon: 'la-home',
        page: 'null',
        badge: { type: 'badge-info', value: '3' },
        submenu: {
          items: [
            {
              title: 'Sales',
              icon: 'la-dollar',
              page: '/dashboard/sales'
            },
            {
              title: 'Ecommerce',
              icon: 'la-cart-plus',
              page: '/dashboard/ecommerce'
            },
            {
              title: 'Hospital',
              icon: 'la-h-square',
              page: '/dashboard/hospital'
            }  
          ]
        }
      },
      {
        title: 'Templates',
        icon: 'la-television',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Horizontal',
              page: 'null'
            },
            {
              title: 'Vertical',
              page: 'null'
            },
          ]
        }
      },
      {
        title: 'APPS',
        icon: 'la-mobile',
        page: 'null',
        submenu: {
          items: [

            {
              title: 'To Do',
              icon: 'la-edit',
              page: '/todo-app'
            },
            {
              title: 'Contacts',
              icon: 'la-users',
              page: '/contacts'
            },
            {
              title: 'Email Application',
              icon: 'la-envelope',
              page: '/email'
            },
            {
              title: 'Chat Application',
              icon: 'la-comments',
              page: '/chats'
            },
            {
              title: 'Calenders',
              icon: 'la-calendar',
              page: 'null',
              submenu: {
                items: [
                  {
                    title: 'Basic',
                    page: '/calender/basic'
                  },
                  {
                    title: 'Events',
                    page: '/calender/events'
                  },

                  {
                    title: 'Add Event',
                    page: '/calender/addevent'
                  },
                ]
              }
            },
            {
              title: 'KanBan',
              icon: 'la-comments',
              page: '/kanban'
            },            
          ]
        }
      },
      {
        title: 'Pages',
        icon: 'la-file-text',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'News Feed',
              icon: 'la-newspaper-o',
              page: '/news-feed/news-feed'
            },
            {
              title: 'Social Feed',
              icon: 'la-share-alt',
              page: '/social-feed/social-feed'
            },
            {
              title: 'Invoice',
              icon: 'la-clipboard',
              page: 'null',
              submenu: {
                items: [
                  {
                    title: 'Invoice Summary',
                    page: '/invoice/invoice-summary',
                  },
                  {
                    title: 'Invoice Template',
                    page: '/invoice/invoice-template',
                  },
                  {
                    title: 'Invoice List',
                    page: '/invoice/invoice-list',
                  },
                ]
              }
            },
            {
              title: 'Timelines',
              icon: 'la-film',
              page: 'null',
              submenu: {
                items: [
                  {
                    title: 'Timelines Center',
                    page: '/timelines/timelines-center',
                  },
                  {
                    title: 'Timelines Left ',
                    page: '/timelines/timelines-left',
                  },
                  {
                    title: 'Timelines Right ',
                    page: '/timelines/timelines-right',
                  },
                  {
                    title: 'Timelines Horizontal',
                    page: '/timelines/timelines-horizontal',
                  }
                ]
              }
            },
            {
              title: 'User',
              icon: 'la-user',
              page: 'null',
              submenu: {
                items: [
                  {
                    title: 'User Profile',
                    page: '/user/user-profile',
                  },
                  {
                    title: 'User Cards',
                    page: '/user/user-cards',
                  },
                ]
              }
            },
            {
              title: 'File Uploader',
              icon: 'la la-cloud-upload',
              page: 'null',
              submenu: {
                items: [
                  {
                    title: 'Dropzone',
                    page: '/dropzone/dropzone',
                  }
                ]
              }
            },
            {
              title: 'Gallery',
              icon: 'la-image',
              page: 'null',
              submenu: {
                items: [
                  {
                    title: 'Gallery Grid',
                    page: '/gallery/gallery-grid',
                  },
                  {
                    title: 'Gallery Grid with Desc',
                    page: '/gallery/gallery-grid-desc',
                  },
                  {
                    title: 'Masonry Gallery',
                    page: '/gallery/masonry-gallery',
                  },
                  {
                    title: 'Hover Effect',
                    page: '/gallery/hover-effect',
                  },
                ]
              }
            },
            {
              title: 'Authentication',
              icon: 'la-unlock',
              page: 'null',
              submenu: {
                items: [
                  {
                    title: 'Login Simple',
                    page: '/authentication/loginSimple',
                  },
                  {
                    title: 'Login With Bg',
                    page: '/authentication/loginWithBg',
                  },
                  {
                    title: 'Login With Bg Image',
                    page: '/authentication/loginWithBgImage',
                  },
                  {
                    title: 'Login With Navbar',
                    page: '/authentication/loginWithNavbar',
                  },
                  {
                    title: 'Login Advanced',
                    page: '/authentication/loginAdvanced',
                  },
                  {
                    title: 'Register Simple',
                    page: '/authentication/registerSimple',
                  },
                  {
                    title: 'Register With Bg',
                    page: '/authentication/registerWithBg',
                  },
                  {
                    title: 'Register With Bg Image',
                    page: '/authentication/registerWithBgImage',
                  },
                  {
                    title: 'Register With Navbar',
                    page: '/authentication/registerWithNavbar',
                  },
                  {
                    title: 'Register Advanced',
                    page: '/authentication/registerAdvanced',
                  },
                  {
                    title: 'Unlock User',
                    page: '/authentication/unlockUser',
                  },
                  {
                    title: 'recover-password',
                    page: '/authentication/recoverPassword',
                  },
                ]
              }
            },
            {
              title: 'Error',
              icon: 'la-warning',
              page: 'null',
              submenu: {
                items: [
                  {
                    title: 'Error 400',
                    page: '/error/error400',
                  },
                  {
                    title: 'Error 400 with Navbar',
                    page: '/error/error400WithNavbar',
                  },
                  {
                    title: 'Error 401',
                    page: '/error/error401',
                  },
                  {
                    title: 'Error 401 with Navbar',
                    page: '/error/error401WithNavbar',
                  },
                  {
                    title: 'Error 403',
                    page: '/error/error403',
                  },
                  {
                    title: 'Error 403 with Navbar',
                    page: '/error/error403WithNavbar',
                  },
                  {
                    title: 'Error 404',
                    page: '/error/error404',
                  },
                  {
                    title: 'Error 404 with Navbar',
                    page: '/error/error404WithNavbar',
                  },
                  {
                    title: 'Error 500',
                    page: '/error/error500',
                  },
                  {
                    title: 'Error 500 with Navbar',
                    page: '/error/error500WithNavbar',
                  },
                ]
              }
            },
            {
              title: 'Search',
              icon: 'la-search',
              page: 'null',
              submenu: {
                items: [
                  {
                    title: 'Search Page',
                    page: '/others/searchPage',
                  },
                  {
                    title: 'Search Website',
                    page: '/search/searchWebsite',
                  },
                  {
                    title: 'Search Images',
                    page: '/search/searchImages',
                  },
                  {
                    title: 'Search Videos',
                    page: '/search/searchVideos',
                  },
                ]
              }
            },
            {
              title: 'Others',
              icon: 'la-file-text',
              page: 'null',
              submenu: {
                items: [
                  {
                    title: 'Coming Soon',
                    page: 'null',
                    submenu: {
                      items: [
                        {
                          title: 'Flat',
                          page: '/others/flat'
                        },
                        {
                          title: 'Bg image',
                          page: '/others/bgImage'
                        },
                        // {
                        //   title: 'Bg video',
                        //   page: '/others/bgVideo'
                        // },
                      ]
                    }
                  },
                  {
                    title: 'Maintenance',
                    page: '/others/maintenance'
                  },
                ]
              }
            },
          ]
        }
      },
      {
        title: ' UI',
        icon: 'la-pencil',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Components',
              icon: 'la-server',
              page: 'null',
              submenu: {
                items: [
                  {
                    title: 'Alerts',
                    page: '/components/alerts'
                  },
                  {
                    title: 'Callout',
                    page: '/components/callout'
                  },
                  {
                    title: 'Buttons',
                    page: 'null',
                    submenu: {
                      items: [
                        {
                          title: 'Basic Buttons',
                          page: '/components/basic-buttons'
                        },
                        {
                          title: 'Extended Buttons',
                          page: '/components/extended-buttons'
                        }
                      ]
                    }
                  },
                  {
                    title: 'Tooltips',
                    page: '/components/tooltips'
                  },
                  {
                    title: 'Dropdowns',
                    page: '/components/dropdowns'
                  },
                  {
                    title: 'List Group',
                    page: '/components/list-group'
                  },
                  {
                    title: 'Popovers',
                    page: '/components/popovers'
                  },
                  {
                    title: 'Carousel',
                    page: '/components/carousel'
                  },
                  {
                    title: 'Collapse',
                    page: '/components/collapse'
                  },
                  {
                    title: 'Modals',
                    page: '/components/modals'
                  },
                  {
                    title: 'Progress',
                    page: '/components/progress'
                  },
                  {
                    title: 'Pill Badges',
                    page: '/components/pill-badges'
                  },
                  {
                    title: 'Scrollable',
                    page: '/components/scrollable'
                  },
                  {
                    title: 'Navs Component',
                    page: '/components/navs'
                  },
                  {
                    title: 'Badges',
                    page: '/components/badges'
                  },
                  {
                    title: 'Media Objects',
                    page: '/components/mediaobjects'
                  },
                  {
                    title: 'Spinners',
                    page: '/components/spinners'
                  },
                  {
                    title: 'Pagination',
                    page: '/components/pagination'
                  },
                  {
                    title: 'Pills Component',
                    page: '/components/pills'
                  }
                ]
              }
            },
            {
              title: 'Cards',
              icon: 'la-tablet',
              page: 'null',
              submenu: {
                items: [
                  {
                    title: 'Bootstrap',
                    page: '/cards/bootstrap'
                  }
                ]
              }
            },
            {
              title: 'Advance Cards',
              icon: 'la-fire',
              page: 'null',
              submenu: {
                items: [
                  {
                    title: 'Statistics',
                    page: '/advanceCards/statistics'
                  },
                  {
                    title: 'Social',
                    page: '/advanceCards/social'
                  },
                  {
                    title: 'Charts',
                    page: '/advanceCards/charts'
                  },
                ]
              }
            },
            {
              title: 'Extra Components',
              icon: 'la-diamond',
              page: 'null',
              submenu: {
                items: [
                  {
                    title: 'Date Time Picker',
                    page: '/extraComponents/dateTimePicker'
                  },
                  {
                    title: 'TypeAhead',
                    page: '/extraComponents/typeAhead'
                  },
                  {
                    title: 'Text Editer',
                    page: '/extraComponents/text-editor'
                  }
                ]
              }
            },
            {
              title: 'Icons',

              icon: 'la-eye',
              page: 'null',
              submenu: {
                items: [
                  {
                    title: 'Feather',
                    page: '/icons/feather'
                  },
                  {
                    title: 'Line Awesome',
                    page: '/icons/line-awesome'
                  },
                  {
                    title: 'Meteocons',
                    page: '/icons/meteocons'
                  },
                  {
                    title: 'Simple Line Icons',
                    page: '/icons/simple-line-icons'
                  }
                ]
              }
            },
          ]
        }
      },
      { section: 'Forms', icon: 'la-ellipsis-h' },
      {
        title: 'Form ',

        icon: 'la-th-list',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Form Elements',

              icon: 'la-terminal',
              page: 'null',
              submenu: {
                items: [
                  {
                    title: 'Form Inputs',
                    page: '/form-elements/form-inputs'
                  },
                  {
                    title: 'Input Groups',
                    page: '/form-elements/input-groups'
                  },
                  {
                    title: 'Input Grid',
                    page: '/form-elements/input-grid'
                  },
                  {
                    title: 'Checkboxes & Radios',
                    page: '/form-elements/checkboxes-radios'
                  },
                  {
                    title: 'Switch',
                    page: '/form-elements/switch'
                  },
                  {
                    title: 'Select',
                    page: '/form-elements/select'
                  },
                  {
                    title: 'Extended Inputs',
                    page: '/form-elements/extendedinputs'
                  },
                ]
              }
            },
            {
              title: 'Form Layouts',

              icon: 'la-file-text',
              page: 'null',
              submenu: {
                items: [
                  {
                    title: 'Basic Forms',
                    page: '/form-layouts/basic-forms'
                  },
                  {
                    title: 'Horizontal Forms',
                    page: '/form-layouts/horizontal-forms'
                  },
                  {
                    title: 'Hidden Labels',
                    page: '/form-layouts/hidden-labels'
                  },
                  {
                    title: 'Form Actions',
                    page: '/form-layouts/form-actions'
                  },
                  {
                    title: 'Row Separator',
                    page: '/form-layouts/row-separator'
                  },
                  {
                    title: 'Bordered',
                    page: '/form-layouts/bordered'
                  },
                  {
                    title: 'Striped Rows',
                    page: '/form-layouts/striped-rows'
                  },
                  {
                    title: 'Striped Labels',
                    page: '/form-layouts/striped-labels'
                  },
                ]
              }
            },
            {
              title: 'Form Wizard',

              icon: 'la-paste',
              page: '/form-wizard',
            },
            {
              title: 'Form Repeater',

              icon: 'la-repeat',
              page: '/form-repeater'
            }
          ]
        }
      },
      { section: 'Charts', icon: 'la-ellipsis-h' },
      {
        title: 'Charts',

        icon: 'la-line-chart',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'ChartJs',
              icon: 'la-area-chart',
              page: '/chartjs/charts'
            },
            {
              title: 'Chartist',
              icon: 'la-pie-chart',
              page: '/ngchartist/linecharts'
            }
          ]
        }
      },
     { section: 'Table', icon: 'la-ellipsis-h' },
      {
        title: 'Tables',

        icon: 'la-table',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Boostrap Tables',

              icon: 'la-table',
              page: 'null',
              submenu: {
                items: [
                  {
                    title: 'Basic Table',
                    page: '/boostraptables/basictable'
                  },
                  {
                    title: 'Table Border',
                    page: '/boostraptables/tableborder'
                  },
                  {
                    title: 'Table Sizing',
                    page: '/boostraptables/tablesizing'
                  },
                  {
                    title: 'Table Styling',
                    page: '/boostraptables/tablestyling'
                  },
                  {
                    title: 'Table Components',
                    page: '/boostraptables/tablecomponents'
                  },
                  {
                    title: 'Ngx BoostrapTables',
                    page: '/boostraptables/ngxboostraptables'
                  },
                ]
              }
            },
            {
              title: 'Data Tables',

              icon: 'la-th',
              page: 'null',
              submenu: {
                items: [
                  {
                    title: 'Basic Installation',
                    page: '/datatables/basicinitialisation'

                  },
                  {
                    title: 'Styling',
                    page: '/datatables/styling'
                  },
                  {
                    title: 'API',
                    page: '/datatables/api'

                  },
                ]
              }
            },
            {
              title: 'DataTables Ext',

              icon: 'la-th-large',
              page: 'null',
              submenu: {
                items: [
                  {
                    title: 'Buttons',
                    page: '/datatablesext/buttons'

                  },
                  {
                    title: 'HTML5 Data Export',
                    page: '/datatablesext/html5dataexport'

                  },
                  {
                    title: 'Hidden On load',
                    page: '/datatablesext/hiddentable'

                  },
                ]
              }
            }
          ]
        }
      },
      { section: 'SUPPORT', icon: 'la-ellipsis-h' },
      {
        title: 'Support',

        icon: 'la-support',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Starter Kit',
              icon: 'la-puzzle-piece',
              page: 'https://modern-admin-8453e.firebaseapp.com/changelog',
              isExternalLink: true
            },
            {
              title: 'Changelog',
              icon: 'la-file',
              page: '/changelog',
              badge: { type: 'badge-danger', value: '3.5' },
            },
            {
              title: 'Raise Support',
              icon: 'la-support',
              page: 'https://pixinvent.ticksy.com/',
              isExternalLink: true
            },
            {
              title: 'Documentaion',
              icon: 'la-text-height',
              page: 'https://modern-admin-docs.web.app/html/ltr/documentation/index.html',
              isExternalLink: true,
            }
          ]
        }
      }
    ]
  },
  vertical_menu: {
    items: [
      {
        title: 'Dashboard',
        icon: 'la-home',
        page: 'null',
        badge: { type: 'badge-info', value: '3' },
        submenu: {
          items: [
           {
              title: 'Sales',
              page: '/dashboard/sales'
            },
            {
              title: 'Ecommerce',
              page: '/dashboard/ecommerce'
            },
            {
              title: 'Hospital',
              page: '/dashboard/hospital'
            }           
          ]
        }
      },
      {
        title: 'Templates',
        icon: 'la-television',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Horizontal',
              page: 'null'
            },
            {
              title: 'Vertical',
              page: 'null'
            },
          ]
        }
      },
      { section: 'APPS', icon: 'la-ellipsis-h' },

      {
        title: 'To Do',
        icon: 'la-edit',
        page: '/todo-app'
      },
      {
        title: 'Contacts',
        icon: 'la-users',
        page: '/contacts'
      },
      {
        title: 'Email Application',
        icon: 'la-envelope',
        page: '/email'
      },
      {
        title: 'Chat Application',
        icon: 'la-comments',
        page: '/chats'
      },
      {
        title: 'Calenders',
        icon: 'la-calendar',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Basic',
              page: '/calender/basic'
            },
            {
              title: 'Events',
              page: '/calender/events'
            },

            {
              title: 'Addevent',
              page: '/calender/addevent'
            },
          ]
        }
      },
      {
        title: 'KanBan',
        icon: 'la-comments',
        page: '/kanban'
      },
      { section: 'PAGES', icon: 'la-ellipsis-h' },
      {
        title: 'News Feed',
        icon: 'la-newspaper-o',
        page: '/news-feed/news-feed'
      },
      {
        title: 'Social Feed',
        icon: 'la-share-alt',
        page: '/social-feed/social-feed'
      },
      {
        title: 'Invoice',
        icon: 'la-clipboard',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Invoice Summary',
              page: '/invoice/invoice-summary',
            },
            {
              title: 'Invoice Template',
              page: '/invoice/invoice-template',
            },
            {
              title: 'Invoice List',
              page: '/invoice/invoice-list',
            },
          ]
        }
      },
      {
        title: 'Timelines',
        icon: 'la-film',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Timelines Center',
              page: '/timelines/timelines-center',
            },
            {
              title: 'Timelines Left ',
              page: '/timelines/timelines-left',
            },
            {
              title: 'Timelines Right ',
              page: '/timelines/timelines-right',
            },
            {
              title: 'Timelines Horizontal',
              page: '/timelines/timelines-horizontal',
            }
          ]
        }
      },
      {
        title: 'User',
        icon: 'la-user',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'User Profile',
              page: '/user/user-profile',
            },
            {
              title: 'User Cards',
              page: '/user/user-cards',
            },
          ]
        }
      },
      {
        title: 'Gallery',
        icon: 'la-image',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Gallery Grid',
              page: '/gallery/gallery-grid',
            },
            {
              title: 'Gallery Grid with Desc',
              page: '/gallery/gallery-grid-desc',
            },
            {
              title: 'Masonry Gallery',
              page: '/gallery/masonry-gallery',
            },
            {
              title: 'Hover Effect',
              page: '/gallery/hover-effect',
            },
          ]
        }
      },
      {
        title: 'File Uploader',
        icon: 'la la-cloud-upload',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Dropzone',
              page: '/dropzone/dropzone',
            }
          ]
        }
      },
      {
        title: 'Search',
        icon: 'la-search',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Search Page',
              page: '/others/searchPage',
            },
            {
              title: 'Search Website',
              page: '/search/searchWebsite',
            },
            {
              title: 'Search Images',
              page: '/search/searchImages',
            },
            {
              title: 'Search Videos',
              page: '/search/searchVideos',
            },
          ]
        }
      },
      {
        title: 'Authentication',
        icon: 'la-unlock',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Login Simple',
              page: '/authentication/loginSimple',
            },
            {
              title: 'Login With Bg',
              page: '/authentication/loginWithBg',
            },
            {
              title: 'Login With Bg Image',
              page: '/authentication/loginWithBgImage',
            },
            {
              title: 'Login With Navbar',
              page: '/authentication/loginWithNavbar',
            },
            {
              title: 'Login Advanced',
              page: '/authentication/loginAdvanced',
            },
            {
              title: 'Register Simple',
              page: '/authentication/registerSimple',
            },
            {
              title: 'Register With Bg',
              page: '/authentication/registerWithBg',
            },
            {
              title: 'Register With Bg Image',
              page: '/authentication/registerWithBgImage',
            },
            {
              title: 'Register With Navbar',
              page: '/authentication/registerWithNavbar',
            },
            {
              title: 'Register Advanced',
              page: '/authentication/registerAdvanced',
            },
            {
              title: 'Unlock User',
              page: '/authentication/unlockUser',
            },
            {
              title: 'recover-password',
              page: '/authentication/recoverPassword',
            },
          ]
        }
      },
      {
        title: 'Error',
        icon: 'la-warning',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Error 400',
              page: '/error/error400',
            },
            {
              title: 'Error 400 with Navbar',
              page: '/error/error400WithNavbar',
            },
            {
              title: 'Error 401',
              page: '/error/error401',
            },
            {
              title: 'Error 401 with Navbar',
              page: '/error/error401WithNavbar',
            },
            {
              title: 'Error 403',
              page: '/error/error403',
            },
            {
              title: 'Error 403 with Navbar',
              page: '/error/error403WithNavbar',
            },
            {
              title: 'Error 404',
              page: '/error/error404',
            },
            {
              title: 'Error 404 with Navbar',
              page: '/error/error404WithNavbar',
            },
            {
              title: 'Error 500',
              page: '/error/error500',
            },
            {
              title: 'Error 500 with Navbar',
              page: '/error/error500WithNavbar',
            },
          ]
        }
      },
      {
        title: 'Others',
        icon: 'la-file-text',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Coming Soon',
              page: 'null',
              submenu: {
                items: [
                  {
                    title: 'Flat',
                    page: '/others/flat'
                  },
                  {
                    title: 'Bg image',
                    page: '/others/bgImage'
                  },
                  // {
                  //   title: 'Bg video',
                  //   page: '/others/bgVideo'
                  // },
                ]
              }
            },
            {
              title: 'Maintenance',
              page: '/others/maintenance'
            },
          ]
        }
      },
      { section: 'USER INTERFACE', icon: 'la-ellipsis-h' },
      {
        title: 'Cards',
        page: '/cards/bootstrap',
        icon: 'la-tablet'
      },
      {
        title: 'Advance Cards',
        icon: 'la-fire',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Statistics',
              page: '/advanceCards/statistics'
            },
            {
              title: 'Social',
              page: '/advanceCards/social'
            },
            {
              title: 'Charts',
              page: '/advanceCards/charts'
            },
          ]
        }
      },
      {
        title: 'Components',
        icon: 'la-server',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Alerts',
              page: '/components/alerts'
            },
            {
              title: 'Callout',
              page: '/components/callout'
            },
            {
              title: 'Buttons',
              page: 'null',
              submenu: {
                items: [
                  {
                    title: 'Basic Buttons',
                    page: '/components/basic-buttons'
                  },
                  {
                    title: 'Extended Buttons',
                    page: '/components/extended-buttons'
                  }
                ]
              }
            },
            {
              title: 'Carousel',
              page: '/components/carousel'
            },
            {
              title: 'Collapse',
              page: '/components/collapse'
            },
            {
              title: 'Dropdowns',
              page: '/components/dropdowns'
            },
            {
              title: 'List Group',
              page: '/components/list-group'
            },
            {
              title: 'Modals',
              page: '/components/modals'
            },
            {
              title: 'Pagination',
              page: '/components/pagination'
            },
            {
              title: 'Navs Component',
              page: '/components/navs'
            },
            {
              title: 'Pills Component',
              page: '/components/pills'
            },
            {
              title: 'Tooltips',
              page: '/components/tooltips'
            },
            {
              title: 'Popovers',
              page: '/components/popovers'
            },
            {
              title: 'Badges',
              page: '/components/badges'
            },
            {
              title: 'Pill Badges',
              page: '/components/pill-badges'
            },
            {
              title: 'Progress',
              page: '/components/progress'
            },
            {
              title: 'Media Objects',
              page: '/components/mediaobjects'
            },
            {
              title: 'Scrollable',
              page: '/components/scrollable'
            },
            {
              title: 'Spinners',
              page: '/components/spinners'
            },
          ]
        }
      },
      {
        title: 'Extra Components',
        icon: 'la-diamond',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Date Time Picker',
              page: '/extraComponents/dateTimePicker'
            },
            {
              title: 'TypeAhead',
              page: '/extraComponents/typeAhead'
            },
            {
              title: 'Text Editer',
              page: '/extraComponents/text-editor'
            }
          ]
        }
      },
      {
        title: 'Icons',

        icon: 'la-eye',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Feather',
              page: '/icons/feather'
            },
            {
              title: 'Line Awesome',
              page: '/icons/line-awesome'
            },
            {
              title: 'Meteocons',
              page: '/icons/meteocons'
            },
            {
              title: 'Simple Line Icons',
              page: '/icons/simple-line-icons'
            }
          ]
        }
      },
      { section: 'FORMS', icon: 'la-ellipsis-h' },
      {
        title: 'Form Elements',

        icon: 'la-terminal',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Form Inputs',
              page: '/form-elements/form-inputs'
            },
            {
              title: 'Input Groups',
              page: '/form-elements/input-groups'
            },
            {
              title: 'Input Grid',
              page: '/form-elements/input-grid'
            },
            {
              title: 'Checkboxes & Radios',
              page: '/form-elements/checkboxes-radios'
            },
            {
              title: 'Switch',
              page: '/form-elements/switch'
            },
            {
              title: 'Select',
              page: '/form-elements/select'
            },
            {
              title: 'Extended Inputs',
              page: '/form-elements/extendedinputs'
            },
          ]
        }
      },
      {
        title: 'Form Layouts',

        icon: 'la-file-text',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Basic Forms',
              page: '/form-layouts/basic-forms'
            },
            {
              title: 'Horizontal Forms',
              page: '/form-layouts/horizontal-forms'
            },
            {
              title: 'Hidden Labels',
              page: '/form-layouts/hidden-labels'
            },
            {
              title: 'Form Actions',
              page: '/form-layouts/form-actions'
            },
            {
              title: 'Row Separator',
              page: '/form-layouts/row-separator'
            },
            {
              title: 'Bordered',
              page: '/form-layouts/bordered'
            },
            {
              title: 'Striped Rows',
              page: '/form-layouts/striped-rows'
            },
            {
              title: 'Striped Labels',
              page: '/form-layouts/striped-labels'
            },
          ]
        }
      },
      {
        title: 'Form Wizard',

        icon: 'la-paste',
        page: '/form-wizard',
        // submenu: {
        //   items: [
        //     {
        //       title: 'Circle Style',
        //       page: '/form-wizard/circle-style'
        //     },
        //   ]
        // }
      },
      {
        title: 'Form Repeater',

        icon: 'la-repeat',
        page: '/form-repeater'
      },
      { section: 'TABLE', icon: 'la-ellipsis-h' },
      {
        title: 'Boostrap Tables',

        icon: 'la-table',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Basic Table',
              page: '/boostraptables/basictable'
            },
            {
              title: 'Table Border',
              page: '/boostraptables/tableborder'
            },
            {
              title: 'Table Sizing',
              page: '/boostraptables/tablesizing'
            },
            {
              title: 'Table Styling',
              page: '/boostraptables/tablestyling'
            },
            {
              title: 'Table Components',
              page: '/boostraptables/tablecomponents'
            },
            {
              title: 'Ngx BoostrapTables',
              page: '/boostraptables/ngxboostraptables'
            },
          ]
        }
      },
      {
        title: 'Data Tables',

        icon: 'la-th',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Basic Installation',
              page: '/datatables/basicinitialisation'

            },
            {
              title: 'Styling',
              page: '/datatables/styling'
            },
            {
              title: 'API',
              page: '/datatables/api'

            },
          ]
        }
      },
      {
        title: 'DataTables Ext',

        icon: 'la-th-large',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Buttons',
              page: '/datatablesext/buttons'

            },
            {
              title: 'HTML5 Data Export',
              page: '/datatablesext/html5dataexport'

            },
            {
              title: 'Hidden On load',
              page: '/datatablesext/hiddentable'

            },
          ]
        }
      },
      { section: 'CHARTS', icon: 'la-ellipsis-h' },
      {
        title: 'Chartjs',
        icon: 'la-bar-chart',
        page: '/chartjs/charts',
      },
      {
        title: 'Chartist',
        icon: 'la-pie-chart',
        page: '/ngchartist/linecharts'
      },
      {
        title: 'Starter Kit',
        icon: 'la-puzzle-piece',
        page: 'https://modern-admin-8453e.firebaseapp.com/changelog',
        isStarterkitExternalLink: true,
      },
      {
        title: 'Changelog',
        icon: 'la-file',
        page: '/changelog',
        badge: { type: 'badge-danger', value: '3.5' }
      },
      { section: 'SUPPORT', icon: 'la-ellipsis-h' },
      {
        title: 'Raise Support',
        icon: 'la-support',
        page: 'https://pixinvent.ticksy.com/',
        isExternalLink: true
      },
      {
        title: 'Documentaion',
        icon: 'la-text-height',
        page: 'https://modern-admin-docs.web.app/html/ltr/documentation/index.html',
        isExternalLink: true,
      }
    ]
  }

};





