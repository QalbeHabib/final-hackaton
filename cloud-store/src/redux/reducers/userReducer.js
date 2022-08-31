const initialState = {

      isLoggedIn: false,
      userObj: {},
      logoutAlert:false,
      deleteProduct:false,
      deleteProductId:'',
      cartDrawer:false,
      cartData:[],
      searchBox:false,
      searchProducts:[],
      allProducts:[],
      isAdminLogin:false,


}

const currentUser = (state = initialState, action) => {
  switch(action.type){
      case 'SET_CURRENT_USER':
          return {
          ...state,
                  ...state.users,
                  isLoggedIn: action.payload.login_state,
                  userObj: action.payload.user,
                  isAdminLogin:action.payload.role,
                  logoutAlert:false
                  
              }
      case 'LOG_OUT':
              return {
              ...state,
                      ...state.users,
                      logoutAlert:action.payload.alert
                      
                  }
      case 'DELETE_PRODUCT':
                      return {
                      ...state,
                              ...state.users,
                              deleteProduct:action.payload.alert,
                              deleteProductId:action.payload.id
                          }
      case 'SEARCH_BOX':
          return {
          ...state,
                  ...state.users,
                  searchBox:action.payload.searchAlert,
                  searchProducts:action.payload.products
                  
              }
      case 'CART_DRAWER':
          return {
          ...state,
                  ...state.users,
                  cartDrawer: action.payload.drawer ,
                  cartData:action.payload.cartData,

              }
      case 'ALL_PRODUCTS':
          return {
          ...state,
                  ...state.users,
                  allProducts: action.payload.products ,

              }
      default:
          return state
  }
}

export const user =  currentUser;