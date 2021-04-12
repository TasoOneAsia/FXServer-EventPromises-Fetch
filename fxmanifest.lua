fx_version 'cerulean'
game 'gta5'

author 'Taso'
description 'A POC for combining promisfied events & NUI fetch'
repository 'https://github.com/TasoOneAsia/FXServer-EventPromises-Fetch'
version '1.0.0'

server_script 'dist/server/*.js'

client_script 'dist/client/*.js'

ui_page 'dist/nui/index.html'

files {
  'dist/nui/index.html',
  'dist/nui/static/**/*'
}