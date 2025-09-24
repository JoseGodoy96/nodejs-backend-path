# Day 5 – Git & GitHub / Control de versiones y GitHub

---

## 📚 Key Concepts / Conceptos Clave

### 🔹 Git Básico
Git es un sistema de control de versiones que permite llevar un historial de los cambios en tu código.

**Comandos esenciales:**
- `git init` → inicializar un repositorio local.
- `git status` → ver el estado de los archivos.
- `git add <archivo>` → agregar cambios al staging area.
- `git commit -m "mensaje"` → guardar cambios con un mensaje descriptivo.
- `git log` → ver el historial de commits.
- `git diff` → ver cambios no confirmados.

---

### 🔹 Ramas / Branches
Permiten trabajar en **features** o cambios sin afectar la rama principal.

- Crear rama: `git branch nombre-rama`
- Cambiar de rama: `git checkout nombre-rama`
- Crear y cambiar: `git checkout -b nombre-rama`
- Fusionar: `git merge nombre-rama`

**Buenas prácticas:**
- Nombres claros: `feature/login`, `fix/typo`, `refactor/user-model`.
- Mantener `main` siempre estable.

---

### 🔹 GitHub / Repositorios Remotos
GitHub permite alojar tu repositorio en la nube y colaborar con otros.

- Crear repositorio en GitHub.
- Conectar repo local: `git remote add origin URL_DEL_REPO`
- Subir cambios: `git push origin main`
- Traer cambios: `git pull origin main`
- Pull requests: revisión de cambios antes de fusionar ramas.

---

### 🔹 Buenas prácticas en commits
- Mensajes cortos, claros y en tiempo presente.
- Usar un prefijo si es feature/fix/refactor:
