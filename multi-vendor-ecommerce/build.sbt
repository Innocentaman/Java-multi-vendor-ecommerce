name := "multi-vendor-ecommerce"

version := "1.0"

lazy val root = (project in file("."))
  .enablePlugins(PlayJava, PlayEbean)

scalaVersion := "2.13.14"

libraryDependencies ++= Seq(
  guice,
  jdbc,
  evolutions,

  "com.typesafe.play" %% "play-ebean" % "7.1.0",
  "com.mysql" % "mysql-connector-j" % "8.4.0",

  "io.jsonwebtoken" % "jjwt-api" % "0.12.5",
  "io.jsonwebtoken" % "jjwt-impl" % "0.12.5",
  "io.jsonwebtoken" % "jjwt-jackson" % "0.12.5",

  "javax.validation" % "validation-api" % "2.0.1.Final",
  "org.hibernate.validator" % "hibernate-validator" % "6.2.5.Final",

  "org.mindrot" % "jbcrypt" % "0.4",

  "org.junit.jupiter" % "junit-jupiter" % "5.10.2" % Test
)