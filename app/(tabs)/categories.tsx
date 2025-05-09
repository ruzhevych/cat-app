import {View, Text, StyleSheet, TouchableOpacity, FlatList} from "react-native";
import {useRouter} from "expo-router";
import {useAppDispatch, useAppSelector} from "@/store";
import AppLogo from "@/components/AppLogo";
import {useGetCategoriesQuery} from "@/services/categoryService";
import LoadingOverlay from "@/components/LoadingOverlay";
import CategoryCard from "@/components/category/CategoryCard";

const CategoriesScreen = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const token = useAppSelector((state) => state.user.token);
    const {data: categories, isLoading, error} = useGetCategoriesQuery(token);

    console.log("data", categories);
    console.log("error", error);

    return (
        <View>
            <Text style={styles.title}>Категорії</Text>
            <LoadingOverlay visible={isLoading} />
            {categories && (
                <FlatList
                    data={categories}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ gap: 10, paddingBottom: 200 }}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <View className="w-[49%] pb-5">
                            <CategoryCard category={item} />
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    title: {fontSize: 20, marginBottom: 15, marginTop: 50, textAlign: "center", fontWeight: "bold"},
});

export default CategoriesScreen;