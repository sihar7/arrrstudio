# Film ArrrStudio

by ArrrStudio · https://arrrstudio.com · Discord https://discord.gg/mtn3YmwjV

Film 24 detik dibuat sepenuhnya dari kode (tanpa footage/musik pihak ketiga):

- `stage.html` — panggung kanvas 1920×1080, `window.render(t)` menggambar frame detik `t`.
  `?hero` = versi ambient tanpa tipografi untuk latar hero (kiri bawah dikosongkan untuk judul web).
- `render.js` — Chrome headless (playwright-core) menyimpan frame JPEG.
- `audio.py` — skor audio sintetis (numpy). Waktu adegan `CUTS` harus sama dengan `stage.html`.
- `voice.py` — narasi perempuan per bahasa (edge-tts: `id-ID-GadisNeural`, `en-US-AvaNeural`) dicampur ke musik
  dengan ducking → `film-voice-id.wav` & `film-voice-en.wav`. Teks narasi ada di `LINES` (satu kalimat per adegan).

## Render ulang

```bash
python -I scripts/film/audio.py film.wav
python scripts/film/voice.py film.wav .         # → film-voice-id.wav, film-voice-en.wav
node scripts/film/render.js frames 30          # film lengkap
node scripts/film/render.js frames-hero 30 hero  # versi hero

# per bahasa L = id | en
ffmpeg -framerate 30 -i frames/f%04d.jpg -i film-voice-L.wav -c:v libx264 -preset slow -crf 22 -pix_fmt yuv420p -c:a aac -b:a 160k -movflags +faststart -shortest public/film/arrrstudio-film-L.mp4
ffmpeg -framerate 30 -i frames-hero/f%04d.jpg -i film-voice-L.wav -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart -shortest public/film/arrrstudio-hero-L.mp4
ffmpeg -framerate 30 -i frames-hero/f%04d.jpg -i film-voice-L.wav -vf scale=1280:720 -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart -shortest public/film/arrrstudio-hero-L-720.mp4
```

Poster: frame 195 (logo utuh) → `public/film/poster.webp` (hero) & `film-poster.webp`; frame 680 → `closing.webp`.
Folder `frames*` dan `film.wav` adalah hasil sementara — jangan di-commit.
