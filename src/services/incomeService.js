const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/income`

const index = async (data) => {
    try {
        const res = await fetch(BASE_URL, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

const show = async (incomeId) => {
    try {
        const res = await fetch(`${BASE_URL}/${incomeId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
     return res.json()
    } catch (error) {
        console.log(error)
    }
}

const create = async (incomeFormData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(incomeFormData), 
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

const deleteIncome = async (id) => {
    try {
        const res = await fetch (`${BASE_URL}/${id}`, {
            method: 'DELETE', 
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

const updateIncome = async (id, incomeFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(incomeFormData)
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

export {
    index,
    show,
    create,
    deleteIncome,
    updateIncome
}

