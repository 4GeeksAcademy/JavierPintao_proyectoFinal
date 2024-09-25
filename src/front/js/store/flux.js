const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			anuncios: [],
			cesta: [],
			
			
		},
		actions: {

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			
			crearUsuario: (email, password) => {
				fetch('https://opulent-spork-q6jprgx7gp5h4w75-3001.app.github.dev/api/signUp', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						
						email: email,
						password: password,
						is_active: true
					})
				})
					.then(response => {
						if (!response.ok) {
							throw new Error('Error en la solicitud: ' + response.status);
						}
						return response.json();
					})
					.then(data => {
						console.log('Datos recibidos:', data);
					})
					.catch(error => {
						console.error('Hubo un problema con la solicitud:', error);
					});

			},
			iniciarSesion: (email, password) => {
				fetch('https://opulent-spork-q6jprgx7gp5h4w75-3001.app.github.dev/api/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				})
					.then(response => {
						if (!response.ok) {
							throw new Error('Error en la solicitud: ' + response.status);
						}
						return response.json();
					})
					.then(data => {
						console.log('Datos recibidos:', data);
						localStorage.setItem("token", data.token)
					})
					.catch(error => {
						console.error('Hubo un problema con la solicitud:', error);
					});

			},

			addAnuncio: (marca, kilometros, ano, precio, descripcion, ) => {
				const store = getStore();
				const nuevosAnuncios = [...store.anuncios];
			
				
				nuevosAnuncios.push({
					marca,
					kilometros,
					ano,
					precio,
					descripcion,
					id: nuevosAnuncios.length + 1 // Puedes usar un ID único de otra manera
				});
			
				
				setStore({ anuncios: nuevosAnuncios });
			},
			addCesta: (anuncio) => {
                const store = getStore();
                const existe = store.cesta.find(item => item.id === anuncio.id);
                
                if (existe) {
                    setStore({ cesta: store.cesta.filter(item => item.id !== anuncio.id) });
                } else {
                    setStore({ cesta: [...store.cesta, anuncio] });
                }
			},
			eliminarAnuncio: (id) => {
				const store = getStore();
				const nuevosAnuncios = store.anuncios.filter(anuncio => anuncio.id !== id);
				const nuevaCesta = store.cesta.filter(anuncio => anuncio.id !== id);
				
				setStore({ 
					anuncios: nuevosAnuncios,
					cesta: nuevaCesta
				});
			},
			
		}
	};
};

export default getState;
