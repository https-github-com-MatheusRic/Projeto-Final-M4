import AppDataSource from "../../data-source";

//add promise de arrays de categorias (entities) e add pra pegar no repositoriio 
const listCategoriesServices = async (): Promise<> => {
    const categoriesRepository = AppDataSource.getRepository()
    const categories = await categoriesRepository.find()

    return categories

}
export default listCategoriesServices