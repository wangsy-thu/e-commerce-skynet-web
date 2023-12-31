import globalMsg from '../../global.js'
export default {
  namespaced: true,
  state: {
    // 页面文档可视高度(随窗口改变大小)
    documentClientHeight: 0,
    // 主题主色 cyan(默认青色) / blue(蓝色)......
    themeColorType: '#3E8EF7',
    // 导航条, 布局风格, defalut(默认) / inverse(反向)
    navbarLayoutType: 'inverse',
    // 侧边栏, 布局皮肤, light(浅色) / dark(黑色)
    sidebarLayoutSkin: 'light',
    // 侧边栏, 折叠状态
    sidebarFold: false,
    // 侧边栏, 菜单
    menuList: [],
    menuActiveName: '',
    // 内容, 是否需要刷新
    contentIsNeedRefresh: false,
    // 主入口标签页
    mainTabs: [],
    mainTabsActiveName: ''
  },
  mutations: {
    updateDocumentClientHeight (state, height) {
      state.documentClientHeight = height
    },
    updateThemeColorType (state, type) {
      state.themeColorType = type
      console.log(type)
      globalMsg.setThemeColor(type)
      console.log('asd')
      console.log(globalMsg.themeColor)
      // if (globalMsg.themeColor === type) {
      //   import('../../element-ui-theme/element-' + type + '/index.css')
      // }
      console.log(document.documentElement.style.getPropertyValue('--theme-color'))
      document.getElementsByTagName('body')[0].style.setProperty('--theme-color', type)
      console.log(document.documentElement.style.getPropertyValue('--theme-color'))
    },
    updateNavbarLayoutType (state, type) {
      state.navbarLayoutType = type
    },
    updateSidebarLayoutSkin (state, skin) {
      state.sidebarLayoutSkin = skin
    },
    updateSidebarFold (state, fold) {
      state.sidebarFold = fold
    },
    updateMenuList (state, list) {
      state.menuList = list
    },
    updateMenuActiveName (state, name) {
      state.menuActiveName = name
    },
    updateContentIsNeedRefresh (state, status) {
      state.contentIsNeedRefresh = status
    },
    updateMainTabs (state, tabs) {
      state.mainTabs = tabs
    },
    updateMainTabsActiveName (state, name) {
      state.mainTabsActiveName = name
    }
  }
}
