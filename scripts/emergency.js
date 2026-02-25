// FUNÇÃO DE EMERGÊNCIA (Ativar via Console F12 digitando: emergencyClearSales())
async function emergencyClearSales() {
    const pass = prompt("Digite a senha master para limpar o banco:");
    if (pass !== '2503') return alert("Senha errada!");
    
    console.log("Iniciando faxina de emergência...");
    
    try {
        const salesSnap = await firebase.firestore().collection('sales').get();
        const b = firebase.firestore().batch();
        
        salesSnap.docs.forEach(doc => {
            b.delete(doc.ref);
        });
        
        const playersSnap = await firebase.firestore().collection('players').get();
        playersSnap.docs.forEach(doc => {
            b.update(doc.ref, { 
                equippedItem: firebase.firestore.FieldValue.delete(),
                fame: 0 
            });
        });

        await b.commit();
        alert("✅ BANCO LIMPO COM SUCESSO! O App vai recarregar.");
        window.location.reload();
    } catch (e) {
        alert("Erro na limpeza: " + e.message);
        console.error(e);
    }
}
