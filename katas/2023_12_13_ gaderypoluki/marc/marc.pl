use lib '.';
use GADERYPOLUKI::Transcode;
use feature qw(signatures);
no warnings qw(experimental::signatures);

sub encode($string, $key) {
  my $object = GADERYPOLUKI::Transcode->new($key);
  print $object->transcode($string) . "\n";
}
sub decode($string, $key) {
  return encode($string, $key);
}

encode("ABCD", "agedyropulik");             ;#// => GBCE 
encode("Ala has a cat", "gaderypoluki");    ;#// => Gug hgs g cgt 
decode("Dkucr pu yhr ykbir","politykarenu") ;#// => Dance on the table
decode("Hmdr nge brres","regulaminowy")     ;#// => Hide our beers

