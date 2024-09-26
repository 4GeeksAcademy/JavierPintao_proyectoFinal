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
				return new Promise((resolve, reject) => {
					fetch(process.env.BACKEND_URL + '/api/signUp', {
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
							return reject('Error en la solicitud: ' + response.status);  // Rechazamos la promesa en caso de error
						}
						return response.json();
					})
					.then(data => {
						console.log('Datos recibidos:', data);
						resolve(data);  // Resolución exitosa de la promesa
					})
					.catch(error => {
						console.error('Hubo un problema con la solicitud:', error);
						reject(error);  // Rechazamos la promesa con el error capturado
					});
				});
			},
			
			iniciarSesion: (email, password) => {
				return new Promise((resolve, reject) => {
					fetch(process.env.BACKEND_URL + '/api/login', {
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
							return reject('Error en la solicitud: ' + response.status);  // Rechazamos la promesa en caso de error
						}
						return response.json();
					})
					.then(data => {
						console.log('Datos recibidos:', data);
						localStorage.setItem("token", data.token);  // Guardamos el token en localStorage
						resolve(data);  // Resolución exitosa de la promesa
					})
					.catch(error => {
						console.error('Hubo un problema con la solicitud:', error);
						reject(error);  // Rechazamos la promesa con el error capturado
					});
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
