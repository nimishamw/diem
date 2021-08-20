---
title: "Overview"
slug: "move-overview"
hidden: false
---
Move is a next generation language for secure, sandboxed, and formally verified programming. Its first use case is for
the Diem blockchain, where Move provides the foundation for its implementation. However, Move has been developed with
use cases in mind outside a blockchain context as well.

### Start Here

<d-grid cols="2">
    <d-overlay-card 
        link="/main/docs/move-introduction"
        icon="https://diem-developers-components.netlify.app/images/introduction-to-move.svg" 
        text="Introduction"
        hover-text="Understand Move’s background, current status and architecture">
    </d-overlay-card>
    <d-overlay-card 
        link="/main/docs/move-modules-and-scripts"
        icon="https://diem-developers-components.netlify.app/images/modules-and-scripts.svg" 
        text="Modules and Scripts"
        hover-text="Understand Move’s two different types of programs: Modules and Scripts">
    </d-overlay-card>
    <d-overlay-card 
        link="/main/docs/move-creating-coins"
        icon="https://diem-developers-components.netlify.app/images/diem-coin-sourcing.svg" 
        text="First Tutorial: Creating Coins"
        hover-text="Play with Move directly as you create coins with the language">
    </d-overlay-card>
</d-grid>

### Primitive Types

<d-grid cols="2">
    <d-overlay-card 
        link="/main/docs/move-primitives-integers"
        icon="https://diem-developers-components.netlify.app/images/integers-bool.svg" 
        text="Integers"
        hover-text="Move supports three unsigned integer types: u8, u64, and u128">
    </d-overlay-card>
    <d-overlay-card 
        link="/main/docs/move-primitives-bool"
        icon="https://diem-developers-components.netlify.app/images/integers-bool.svg" 
        text="Bool"
        hover-text="Bool is Move's primitive type for boolean true and false values.">
    </d-overlay-card>
    <d-overlay-card 
        link="/main/docs/move-primitives-address"
        icon="https://diem-developers-components.netlify.app/images/address.svg" 
        text="Address"
        hover-text="Address is a built-in type in Move that is used to represent locations
        in global storage">
    </d-overlay-card>
    <d-overlay-card 
        link="/main/docs/move-primitives-vector"
        icon="https://diem-developers-components.netlify.app/images/vector.svg" 
        text="Vector"
        hover-text="Vector&lt;T&gt; is the only primitive collection type provided by Move">
    </d-overlay-card>
    <d-overlay-card 
        link="/main/docs/move-primitives-signer"
        icon="https://diem-developers-components.netlify.app/images/signer.svg" 
        text="Signer"
        hover-text="Signer is a built-in Move resource type. A signer is a capability that
        allows the holder to act on behalf of a particular address">
    </d-overlay-card>
    <d-overlay-card 
        link="/main/docs/move-primitives-references"
        icon="https://diem-developers-components.netlify.app/images/move-references.svg" 
        text="References"
        hover-text="Move has two types of references: immutable &amp; and mutable.">
    </d-overlay-card>
    <d-overlay-card 
        link="/main/docs/move-primitives-tuples-unit"
        icon="https://diem-developers-components.netlify.app/images/tuples.svg" 
        text="Tuples and Unit"
        hover-text="In order to support multiple return values, Move has tuple-like
        expressions. We can consider unit() to be an empty tuple">
    </d-overlay-card>
</d-grid>

### Basic Concepts

<d-grid cols="2">
    <d-overlay-card 
        link="/main/docs/move-basics-variables"
        icon="https://diem-developers-components.netlify.app/images/local-variables-and-scopes.svg"
        text="Local Variables and Scopes" 
        hover-text="Local variables in Move are lexically (statically) scoped">
    </d-overlay-card>

    <d-overlay-card 
        link="/main/docs/move-basics-abort-assert"
        icon="https://diem-developers-components.netlify.app/images/abort-and-return.svg" 
        text="Abort &amp; Assert"
        hover-text="return and abort are two control flow constructs that end execution, one for the current function and one for the entire transaction">
    </d-overlay-card>

    <d-overlay-card 
        link="/main/docs/move-basics-conditionals"
        icon="https://diem-developers-components.netlify.app/images/conditionals.svg" 
        text="Conditionals" 
        hover-text="An if expression specifies that some code should only be evaluated if a certain condition is true">
    </d-overlay-card>

    <d-overlay-card 
        link="/main/docs/move-basics-loops"
        icon="https://diem-developers-components.netlify.app/images/loops.svg" 
        text="While and Loop"
        hover-text="Move offers two constructs for looping: while and loop">
    </d-overlay-card>

    <d-overlay-card 
        link="/main/docs/move-basics-functions"
        icon="https://diem-developers-components.netlify.app/images/functions.svg" 
        text="Functions" 
        hover-text="Function syntax in Move is shared between module functions and script functions">
    </d-overlay-card>

    <d-overlay-card 
        link="/main/docs/move-basics-structs-and-resources"
        icon="https://diem-developers-components.netlify.app/images/structs-and-resources.svg"
        text="Structs and Resources" 
        hover-text="A struct is a user-defined data structure containing typed fields. A resource is a kind of struct that cannot be copied and cannot be dropped">
    </d-overlay-card>

    <d-overlay-card 
        link="/main/docs/move-basics-constants"
        icon="https://diem-developers-components.netlify.app/images/constants.svg" 
        text="Constants" 
        hover-text="Constants are a way of giving a name to shared, static values inside of a module or script">
    </d-overlay-card>

    <d-overlay-card 
        link="/main/docs/move-basics-generics"
        icon="https://diem-developers-components.netlify.app/images/generics.svg" 
        text="Generics" 
        hover-text="Generics can be used to define functions and structs over different input data types">
    </d-overlay-card>

    <d-overlay-card 
        link="/main/docs/move-basics-equality"
        icon="https://diem-developers-components.netlify.app/images/equality.svg" 
        text="Equality"
        hover-text="Move supports two equality operations == and !=">
    </d-overlay-card>

    <d-overlay-card 
        link="/main/docs/move-basics-uses-aliases"
        icon="https://diem-developers-components.netlify.app/images/uses-and-aliases.svg" 
        text="Uses &amp; Aliases"
        hover-text="The use syntax can be used to create aliases to members in othermodules">
    </d-overlay-card>

</d-grid>

### Global Storage

<d-grid cols="2">
    <d-overlay-card 
        link="/main/docs/move-global-storage-structure"
        icon="https://diem-developers-components.netlify.app/images/intro-to-global-storage.svg"
        text="Global Storage Structure"
        hover-text="The purpose of Move programs is to read from and write to persistent global storage">
    </d-overlay-card>

    <d-overlay-card 
         link="/main/docs/move-global-storage-operators"
        icon="https://diem-developers-components.netlify.app/images/intro-to-global-storage.svg"
        text="Global Storage Operators"
        hover-text="Move programs can create, delete, and update resources in global storage using five instructions">
    </d-overlay-card>

</d-grid>

### Reference

<d-grid cols="2">
    <d-overlay-card 
        link="/main/docs/move-standard-library"
        icon="https://diem-developers-components.netlify.app/images/standard-library.svg"
        text="Standard Library"
        hover-text="The Move standard library exposes interfaces that implement
        functionality on vectors, option types, error codes and fixed-point
        numbers">
    </d-overlay-card>

    <d-overlay-card 
        link="/main/docs/move-coding-conventions"
        icon="https://diem-developers-components.netlify.app/images/coding-conventions.svg"
        text="Coding Conventions"
        hover-text="There are basic coding conventions when writing Move code">
    </d-overlay-card>

</d-grid>