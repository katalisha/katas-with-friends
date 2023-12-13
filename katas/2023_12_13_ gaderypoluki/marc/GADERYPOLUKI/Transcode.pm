package GADERYPOLUKI::Transcode; # Yes folks! It's even worse than having to type messagingengine!!!!!
use v5.30.0;
use strict;
use warnings;
use feature qw(signatures);
no warnings qw(experimental::signatures);

sub new($class, $key) {
  my $self = { transcode => {} };
  $key = lc $key;
  my ($one, $two);
  while ($key) {
    my $one = substr($key,0,1);
    my $two = substr($key,1,1);
    $key    = substr($key,2);
    $self->{transcode}->{$one} = $two;
    $self->{transcode}->{uc $one} = uc $two;
    $self->{transcode}->{$two} = $one;
    $self->{transcode}->{uc $two} = uc $one;
  }
  bless $self, $class;
  return $self;
}

sub transcode($self, $string) {
  return '' if $string eq '';
  my $character = substr($string,0,1);
  $string = substr($string,1);
  return ($self->{transcode}->{$character} ? $self->{transcode}->{$character} : $character ) . $self->transcode($string);
}

1;
