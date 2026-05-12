const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/expense`;

const index = async (data) => {
    try {
        const res = await fetch(BASE_URL, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
}

const show = async (expenseId) => {
    try {
        const res = await fetch(`${BASE_URL}/${expenseId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
}

const create = async (expenseFormData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(expenseFormData)
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
}

const deleteExpense = async (id) => {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
}

const updateExpense = async (id, expenseFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(expenseFormData)
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
}

export {
    index,
    show,
    create,
    deleteExpense,
    updateExpense
};

