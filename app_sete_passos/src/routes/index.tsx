import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import {CarrinhoContext} from '../contexts/CarrinhoContext';
import {withBadge} from 'react-native-elements';
import Login from '../screens/Login';
import Register from '../screens/Register';
import PasswordRecovery from '../screens/PasswordRecovery';
import Home from '../screens/Home';
import Categories from '../screens/Categories';
import Favorites from '../screens/Favorites';
import Profile from '../screens/Profile';
import ProductsCategories from '../screens/ProductsCategories';
import ProductDetails from '../screens/ProductDetails';
import Cart from '../screens/Cart';
import {SplashScreen} from '../screens/SplashScreen';
import ChangePassword from '../screens/ChangePassword';

const TabNavigation = createBottomTabNavigator();

const BottomTabNavigator = () => {
  
  const {contaQuantidadeProdutos} = useContext(CarrinhoContext);

  const BadgeIcone = withBadge(contaQuantidadeProdutos())(Icon);

  return (
    <TabNavigation.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;

          switch (route.name) {
            case 'HomeTabScreen':
              iconName = 'home';
              break;
            case 'CategoriesTabScreen':
              iconName = 'list';
              break;
            case 'FavoritesTabScreen':
              iconName = 'heart';
              break;
            case 'ProfileTabScreen':
              iconName = 'user';
              break;
            case 'CartTabScreen':
              iconName = 'shopping-cart';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: '#D9D9D9',
        tabBarInactiveBackgroundColor: '#D9D9D9',
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'black',
      })}>
      <TabNavigation.Screen
        name="HomeTabScreen"
        component={Home}
        options={{
          tabBarStyle: {
            backgroundColor: 'red',
          },
        }}
      />
      <TabNavigation.Screen name="CategoriesTabScreen" component={Categories} />
      <TabNavigation.Screen name="FavoritesTabScreen" component={Favorites} />
      <TabNavigation.Screen
        name="CartTabScreen"
        component={Cart}
        options={{
          tabBarIcon: () => (
            <BadgeIcone
              name="shopping-cart"
              type="font-awesome"
              size={24}
              color="black"
            />
          ),
        }}
      />
      <TabNavigation.Screen name="ProfileTabScreen" component={Profile} />
    </TabNavigation.Navigator>
  );
};

const StackNavigation = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <StackNavigation.Navigator>
        <StackNavigation.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <StackNavigation.Screen
          name="LoginScreen"
          component={Login}
          options={{headerShown: false}}
        />
        <StackNavigation.Screen
          name="HomeScreen"
          component={BottomTabNavigator}
          options={{headerShown: false}}
        />
        <StackNavigation.Screen
          name="CategoriesScreen"
          component={Categories}
          options={{headerShown: true}}
        />
        <StackNavigation.Screen
          name="Favorites"
          component={Favorites}
          options={{headerShown: true}}
        />
        <StackNavigation.Screen
          name="ProfileScreen"
          component={Profile}
          options={{headerShown: true}}
        />
        <StackNavigation.Screen
          name="ProductsCategoriesScreen"
          component={ProductsCategories}
          options={{
            headerShown: true,
            title: 'Produto Categoria',
            headerStyle: {backgroundColor: '#0D6EFD'},
            headerTintColor: 'white',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
          }}
        />
        <StackNavigation.Screen
          name="ProductDetailsScreen"
          component={ProductDetails}
          options={{
            headerShown: true,
            title: 'Produto',
            headerStyle: {backgroundColor: '#0D6EFD'},
            headerTintColor: 'white',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
          }}
        />
        <StackNavigation.Screen
          name="CartScreen"
          component={Cart}
          options={{headerShown: true, title: 'Produto Categoria'}}
        />
        <StackNavigation.Screen
          name="RegisterScreen"
          component={Register}
          options={{
            headerShown: true,
            title: 'Cadastre-se',
            headerStyle: {backgroundColor: '#0D6EFD'},
            headerTintColor: 'white',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
          }}
        />
        <StackNavigation.Screen
          name="PasswordRecoveryScreen"
          component={PasswordRecovery}
          options={{
            headerShown: true,
            title: 'Recupere sua senha',
            headerStyle: {backgroundColor: '#0D6EFD'},
            headerTintColor: 'white',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
          }}
        />
        <StackNavigation.Screen
          name="ChangePasswordScreen"
          component={ChangePassword}
          options={{
            headerShown: true,
            title: 'Alterar senha',
            headerStyle: {backgroundColor: '#0D6EFD'},
            headerTintColor: 'white',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
          }}
        />
      </StackNavigation.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
