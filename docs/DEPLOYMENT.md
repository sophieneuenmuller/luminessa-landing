# Deployment Guide / Guía de Despliegue — Luminessa Landing 🧪🚀

---

### 🌐 Language / Idioma
- [English Version](#english-version)
- [Versión en Español](#versión-en-español)

---

## English Version

This document explains the infrastructure, automation, and steps required to deploy the Luminessa Landing page to production.

### 🏗️ Architecture Overview
| Layer | Technology | Role |
|-------|------------|------|
| **SSG** | Astro 5.x | Generates static HTML/CSS/JS in `dist/` |
| **Automation** | Forgejo Actions | CI/CD pipeline triggered on branch push |
| **Transfer** | rsync over SSH | Securely synchronizes files to the VPS |
| **Web Server** | Caddy | Serves static files with automatic HTTPS |
| **OS** | Linux (Ubuntu/Debian) | Hosting environment |

### 🤖 CI/CD Pipeline (Forgejo Actions)
The deployment is fully automated via Forgejo Actions.
1.  **Trigger:** A push to the `main` branch.
2.  **Build:** `npm install && npm run build` generates the `dist/` directory.
3.  **Transfer:** Synchronized to the VPS via `rsync` over SSH (port 22).

### 📡 Web Server Configuration (Caddy)
Caddy serves files from `/var/www/luminessa/` with automatic SSL.
```caddy
luminessa.net {
    root * /var/www/luminessa/dist
    file_server
    encode zstd gzip
}
```

### 🕵️ Troubleshooting
- **Build Failures:** Check Node.js version (v22.x).
- **Server Logs:** `journalctl -u caddy -f` on the VPS.

---

## Versión en Español

Este documento explica la infraestructura, automatización y pasos necesarios para desplegar la landing de Luminessa a producción.

### 🏗️ Resumen de Arquitectura
| Capa | Tecnología | Rol |
|------|------------|-----|
| **SSG** | Astro 5.x | Genera HTML/CSS/JS estático en `dist/` |
| **Automatización** | Forgejo Actions | Pipeline de CI/CD al hacer push a la rama |
| **Transferencia** | rsync sobre SSH | Sincroniza archivos de forma segura al VPS |
| **Servidor Web** | Caddy | Sirve archivos estáticos con HTTPS automático |
| **SO** | Linux (Ubuntu/Debian) | Entorno de hosting |

### 🤖 Pipeline de CI/CD (Forgejo Actions)
El despliegue está totalmente automatizado mediante Forgejo Actions.
1.  **Disparador:** Push a la rama `main`.
2.  **Construcción:** `npm install && npm run build` genera el directorio `dist/`.
3.  **Transferencia:** Sincronizado al VPS mediante `rsync` sobre SSH (puerto 22).

### 📡 Configuración del Servidor Web (Caddy)
Caddy sirve los archivos desde `/var/www/luminessa/` con SSL automático.
```caddy
luminessa.net {
    root * /var/www/luminessa/dist
    file_server
    encode zstd gzip
}
```

### 🕵️ Resolución de Problemas (Troubleshooting)
- **Fallos de Build:** Verificar versión de Node.js (v22.x).
- **Logs del Servidor:** `journalctl -u caddy -f` en el VPS para monitorear errores.

---
*Maintained by Sophie. ✨ / Mantenido por Sophie. ✨*
