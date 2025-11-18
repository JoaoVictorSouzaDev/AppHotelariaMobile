import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from 'expo-router';

const TabLayout = () => {
  return (
        <Tabs screenOptions={{ tabBarActiveTintColor: '#4b0505', headerShown: false, tabBarStyle: {justifyContent: 'center', alignItems: "center", height: 60}}} >
            <Tabs.Screen
                name="explorer"
                options={{
                title: 'Pesquisar',
                tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="briefcase-search" color={color} />
            }}
            />
            <Tabs.Screen
                name="reservation"
                options={{
                title: 'Reservas',
                tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="bag-suitcase" color={color} />
                }}
            />
            <Tabs.Screen
                name="account"
                options={{
                title: 'Minha conta',
                tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="account" color={color} />
                }}
            />
        </Tabs>
  );
}
export default TabLayout;