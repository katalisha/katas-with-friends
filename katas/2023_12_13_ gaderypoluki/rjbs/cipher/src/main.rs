use std::env::args;

const ASCII_UC_A: u32 = 65;
const ASCII_LC_A: u32 = 97;

fn lookup_for(secret: &str) -> [Option<char>;26] {
  let mut map = [ None; 26 ];

  let chars: Vec<char> = secret.chars().collect();

  for p in chars.chunks(2) {
    // I'm not handling odd-sized cipher keys here.  User beware.
    let x = u32::from(p[0]) - ASCII_LC_A;
    let y = u32::from(p[1]) - ASCII_LC_A;

    match x {
      0..=26 => {
        map[x as usize] = Some(p[1]);
        map[y as usize] = Some(p[0]);
      },
      _ => ()
    };
  }

  map
}

fn apply_cipher(input: &str, secret: &str) -> String {
  let lookup = lookup_for(secret);
  let output: String = input.chars().map(|c| {
    match c {
      'A'..='Z' => {
        let n = u32::from(c) - ASCII_UC_A;
        if let Some(newc) = lookup[n as usize] {
          newc.to_uppercase().next().unwrap()
        } else {
          c
        }
      }
      'a'..='z' => {
        let n = u32::from(c) - ASCII_LC_A;
        if let Some(newc) = lookup[n as usize] { newc } else { c }
      }
      _ => c
    }
  }).collect();

  output
}

fn main() {
  let argv: Vec<String> = args().skip(1).collect();
  let output = apply_cipher(&argv[1], &argv[0]);

  println!("output: {}", output);
}

#[test]
fn example_tests() {
  assert_eq!(
    apply_cipher("ABCD", "agedyropulik"),
    "GBCE"
  );

  assert_eq!(
    apply_cipher("Ala has a cat", "gaderypoluki"),
    "Gug hgs g cgt",
  );

  assert_eq!(
    apply_cipher("Dkucr pu yhr ykbir","politykarenu"),
    "Dance on the table",
  );

  assert_eq!(
    apply_cipher("Hmdr nge brres","regulaminowy"),
    "Hide our beers"
  );
}
