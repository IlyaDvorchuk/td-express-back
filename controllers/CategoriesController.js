import categories from '../public/categories.json' assert {type: "json"}

export const getCategories = async (req, res) => {
    try {
        res.json(categories)
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Не удалось получить категории',
        })
    }
}