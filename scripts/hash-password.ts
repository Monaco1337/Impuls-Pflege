/**
 * Bcrypt-Hash für users.json erzeugen (Passwort erscheint nur in der Shell, nicht im Repo).
 *
 *   npm run hash-password -- "IhrGeheimesPasswort"
 */
import { hash } from 'bcryptjs'

const pwd = process.argv[2]
if (!pwd || pwd.length < 8) {
  console.error('Verwendung: npm run hash-password -- "<mindestens-8-zeichen>"')
  process.exit(1)
}

const rounds = 12
hash(pwd, rounds).then((h) => {
  console.log(h)
})
